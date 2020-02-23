const mysql = require('mysql');
const router = require('express').Router();
const axios = require('axios');
const mysqlSettings = require('../dbsettings')
const pool = mysql.createPool(mysqlSettings)

router.route('/get').get((req,res)=>{
  res.send("hello")
  //db.end()
})


router.route('/add').post((req,res)=>{
  let listing = {
    building_type:req.body.buildingtype,
    city:req.body.city,
    state:req.body.state,
    street:req.body.street,
    apt:req.body.apt,
    zipcode:req.body.zip,
    price:req.body.price,
    est_payment:req.body.estpayment,
    bedrooms:req.body.bedrooms,
    bathrooms:req.body.bathrooms,
    sqft:req.body.sqft,
    listing_type:req.body.type,
    year_built:req.body.yearbuilt,
    heating:req.body.heating,
    cooling:req.body.cooling,
    parking:req.body.parking,
    lot_unit:req.body.lot.unit,
    lot_quantity:req.body.lot.quantity,
    price_per_sqft:req.body.pricepersqft,
    description:req.body.description,
    formatted_address:'',
    pos_lat:'',
    pos_lng:''
  }
  const nameTypes = {
    street_number:"street_number",
    administrative_area_level_2:"county",
    administrative_area_level_1:"state",
    country:"country",
    route:"route",
    locality:"city",
    postal_code:"zipcode",
    neighborhood:"neighborhood"
  }
  const { city,state,street,apt,zip } = req.body
  const address = encodeURIComponent(`${street} ${listing.apt ? "apt "+listing.apt+" " :''}${city} ${state} ${zip}`)
  let locationData = {}

  const formatData = (data)=>{
  const excludedLocations = ["country","street_number"]
  let formattedData = {
    locations:{},
    formatted_address:'',
    lat_lng:{
      lat:null,
      lng:null
    }
  }

  listing.formatted_address = data[0].formatted_address.replace(/,\s[A-Z]+$/,"")
  listing.pos_lat = data[0].geometry.location.lat,
  listing.pos_lng = data[0].geometry.location.lng

  let locations = data[0].address_components;
  let typesUsed = ["administrative_area_level_1","administrative_area_level_2","locality","postal_code","neighborhood","street_number","route"]
  typesUsed.forEach((type)=>{
    locations.forEach((location)=>{
      if(location.types[0] === type){
        if (type !== "administrative_area_level_1"){
          formattedData.locations[nameTypes[type]] = {
            location_type:nameTypes[type],
            name:location.long_name
          }
        }else{
          formattedData.locations[nameTypes[type]] = {
            location_type:nameTypes[type],
            name:location.short_name
          }
        }
      }
    })
  })

  formattedData.locations.address = {
    location_type:"address",
    name:`${req.body.street},${req.body.city},${req.body.state.toUpperCase()}`,
    name_id:`${req.body.street.toLowerCase().replace(/ /g, '-')}-${req.body.city.toLowerCase().replace(/ /g, '-')}-${req.body.state.toLowerCase()}`
  }

  for(let i in formattedData.locations){
    let loc = formattedData.locations[i];
    if(loc.location_type === "city"){
      loc.name_id = `${loc.name.toLowerCase().replace(/ /g, '-')}-${req.body.state.toLowerCase()}`;
    }else if(loc.location_type === "zipcode"){
      loc.name_id = `${loc.name}-${req.body.city.toLowerCase().replace(/ /g, '-')}-${req.body.state.toLowerCase()}`
    }else if(loc.location_type === "route"){
      loc.name_id = `${loc.name.replace(/ /g, '-').toLowerCase()}-${req.body.city.replace(/ /g, '-').toLowerCase()}-${req.body.state.toLowerCase()}`
    }else if(loc.location_type === "country"){
      loc.name_id = loc.name.replace(/ /g, '-').toLowerCase()
    }else if(loc.location_type === "state"){
      loc.name_id = loc.name.toLowerCase()
    }else if(loc.location_type === "county"){
      loc.name_id = `${loc.name.toLowerCase().replace(/ /g, '-')}-${req.body.state.toLowerCase()}`
    }else if(loc.location_type === "neighborhood"){
      loc.name_id = `${loc.name.toLowerCase().replace(/ /g, '-')}-${req.body.city.toLowerCase().replace(/ /g, '-')}-${req.body.state.toLowerCase()}`
    }
  }

  return formattedData
}

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`)
  .then((res)=>{
    locationData = formatData(res.data.results)
    postData()
  })
  .catch((err)=>{
    if (err){
      throw err
    }
  })

  const postData = ()=>{
    let listingId,stateId,countyId,cityId,neighborhoodId,zipcodeId;
    let location = locationData.locations.state;
    let locations_listings = [];
    let sql;

    pool.getConnection((err,connection)=>{
      connection.beginTransaction((err)=>{
        if (err) {
          connection.rollback(()=>{
            connection.release();
            throw err
          })
        }
        sql = "INSERT IGNORE INTO listing SET ?; SELECT listing_id FROM listing WHERE formatted_address = ?";
        connection.query(sql,[listing,listing.formatted_address],(err,results)=>{
          if (err) {
            return connection.rollback(()=>{
              connection.release();
              throw err
            })
          }
          listingId = results[1][0].listing_id;

          sql = "INSERT IGNORE INTO location SET ?; SELECT location_id FROM location WHERE name_id = ?;";
          connection.query(sql,[locationData.locations.state,locationData.locations.state.name_id],(err,results)=>{
            if (err) {
              return connection.rollback(()=>{
                connection.release();
                throw err
              })
            }
            stateId = results[1][0].location_id;
            locations_listings.push([stateId,listingId])

            sql = "INSERT IGNORE INTO location SET ?; SELECT location_id FROM location WHERE name_id = ?;";
            locationData.locations.county.parent_id = stateId;
            connection.query(sql,[locationData.locations.county,locationData.locations.county.name_id],(err,results)=>{
              if (err) {
                return connection.rollback(()=>{
                  connection.release();
                  throw err
                })
              }
              countyId = results[1][0].location_id;
              locations_listings.push([countyId,listingId])


              sql = "INSERT IGNORE INTO location SET ?; SELECT location_id FROM location WHERE name_id = ?;";
              locationData.locations.city.parent_id = countyId;
              connection.query(sql,[locationData.locations.city,locationData.locations.city.name_id],(err,results)=>{
                if (err) {
                  return connection.rollback(()=>{
                    connection.release();
                    throw err
                  })
                }
                cityId = results[1][0].location_id;
                locations_listings.push([cityId,listingId])

                if(locationData.locations.neighborhood){
                  sql = "INSERT IGNORE INTO location SET ?; SELECT location_id FROM location WHERE name_id = ?;";
                  locationData.locations.neighborhood.parent_id = cityId;
                  connection.query(sql,[locationData.locations.neighborhood,locationData.locations.neighborhood.name_id],(err,results)=>{
                    if (err) {
                      return connection.rollback(()=>{
                        connection.release();
                        throw err
                      })
                    }
                    neighborhoodId = results[1][0].location_id;
                    locations_listings.push([neighborhoodId,listingId])
                  })
                }

                sql = "INSERT IGNORE INTO location SET ?; SELECT location_id FROM location WHERE name_id = ?;";
                locationData.locations.zipcode.parent_id = cityId;
                connection.query(sql,[locationData.locations.zipcode,locationData.locations.zipcode.name_id],(err,results)=>{
                  if (err) {
                    return connection.rollback(()=>{
                      connection.release();
                      throw err
                    })
                  }
                  zipcodeId = results[1][0].location_id;
                  locations_listings.push([neighborhoodId,listingId])

                  sql = "INSERT IGNORE INTO location SET ?; SELECT location_id FROM location WHERE name_id = ?;";
                  locationData.locations.route.parent_id = cityId;
                  connection.query(sql,[locationData.locations.route,locationData.locations.route.name_id],(err,results)=>{
                    if (err) {
                      return connection.rollback(()=>{
                        connection.release();
                        throw err
                      })
                    }
                    routeId = results[1][0].location_id;
                    //res.json(results)
                    locations_listings.push([routeId,listingId])

                    sql = "INSERT IGNORE INTO locations_listings (location_id,listing_id) VALUES ?;";
                    connection.query(sql,[locations_listings],(err,results)=>{
                      if (err) {
                        return connection.rollback(()=>{
                          connection.release();
                          throw err
                        })
                      }

                      sql = "DELETE FROM imagepath WHERE listing_listing_id = ?;";
                      connection.query(sql,listingId,(err,results)=>{
                        if (err) {
                          return connection.rollback(()=>{
                            connection.release();
                            throw err
                          })
                        }
                        const imagePaths = []
                        req.body.images.forEach((image)=>{
                          imagePaths.push([image,listingId])
                        })
                        sql = "INSERT INTO imagepath (image_path,listing_listing_id) VALUES ?;";
                        connection.query(sql,[imagePaths],(err,results)=>{
                          if (err) {
                            return connection.rollback(()=>{
                              connection.release();
                              throw err
                            })
                          }
                          connection.commit((err)=>{
                            if (err){
                              return connection.rollback(()=>{
                                connection.release()
                                throw err
                              })
                            }else{
                              res.send("listing upload successful")
                              connection.release()
                            }
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  }
})


module.exports = router;
