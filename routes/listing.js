const router = require('express').Router();
const mysqlSettings = require('../dbsettings');
const mysql =require('mysql2/promise');
const pool = mysql.createPool(mysqlSettings)
const axios = require('axios');

router.route('/getbylocationid/:locationid').get((req,res)=>{
  const id = req.params.locationid;
  const sql = "SELECT listing_address.* \
               FROM locations_listings \
               INNER JOIN listing_address \
               ON listing_address.listing_id = locations_listings.listing_id \
               WHERE location_id = ?"

  pool.query(sql,id)
  .then((results)=>res.json(results[0]))
  .catch((err)=>{
    res.status(400).send(`error: ${err.message}`)
  })
})

router.route('/getbylocationnameid/:locationnameid').get((req,res)=>{
  const id = req.params.locationnameid;
  let sql = "SELECT listing_address.* \
               FROM locations_listings \
               INNER JOIN listing_address \
               ON listing_address.listing_id = locations_listings.listing_id \
               INNER JOIN location \
               ON location.location_id = locations_listings.location_id \
               WHERE location.name_id = ?";
  pool.query(sql,id)
  .then((results)=>res.json(results[0]))
  .catch((err)=>{
    res.status(400).send(`error: ${err.message}`)
  })
})

router.route('/getbyaddressid/:addressid').get((req,res)=>{
  const id = req.params.addressid;
  console.log(id,"this is the id")
  let sql = "SELECT * \
               FROM listing_address \
               WHERE address_id = ?";
  pool.query(sql,id)
  .then((results)=>res.json(results[0]))
  .catch((err)=>{
    console.log("ERROR!")
    res.status(400).send(`error: ${err.message}`)
  })
})

router.route('/get').get((req,res)=>{
  const id = req.params.locationnameid;
  const sql = "SELECT * FROM listing_address"

  pool.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  });
})



router.route('/add').post((req,res)=>{
  let listing = {
    building_type:req.body.buildingtype,
    address_id:null,
    //city:req.body.city,
    //state:req.body.state,
    //street:req.body.street,
    //apt:req.body.apt,
    //zipcode:req.body.zip,
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
    pos_lat:'',
    pos_lng:''
    //formattedAddress:''
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
  const addressData = {
    formatted_address:null,
    city:req.body.city,
    street:req.body.street,
    apartment:req.body.apt,
    state:req.body.state,
    zipcode:req.body.zip
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

  addressData.formatted_address = data[0].formatted_address.replace(/,\s[A-Z]+$/,"")
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
    //res.json(locationData)
    postData(locationData)
  })
  .catch((err)=>{
    if (err){
      throw err
    }
  })

  const insertLocation = async (connection,location)=>{
    const sql = 'INSERT IGNORE INTO location SET ?;'
    return await connection.query(sql,location)
  }

  const getLocationByNameID = async (connection,nameId)=>{
    const sql = 'SELECT location_id FROM location WHERE name_id = ?;'
    const location = await connection.query(sql,nameId)
    return location[0][0].location_id
  }

  const postData = async (data)=>{
    let sql,listingId,stateId,countyId,cityId,neighborhoodId,routeId,zipcodeId,addressId;
    let locations_listings = [];

    const connection = await pool.getConnection()
    try{
      await connection.beginTransaction()
      //Inserting address components
      sql = 'INSERT IGNORE INTO address SET ?'
      await connection.query(sql,addressData)
      let addressValues;
      if(!addressData.apartment){
        sql = 'SELECT address_id FROM address WHERE formatted_address = ? AND apartment IS NULL'
        addressValues = addressData.formatted_address
      }else{
        sql = 'SELECT address_id FROM address WHERE formatted_address = ? AND apartment = ?'
        addressValues = [addressData.formatted_address,addressData.apartment]
      }
      const addressResult = await connection.query(sql,addressValues)
      addressId = addressResult[0][0].address_id;
      //Inserting listing
      listing.address_id = addressId
      sql = 'INSERT IGNORE INTO listing SET ?;'
      const listingResult = await connection.query(sql,listing)
      sql = 'SELECT listing_id FROM listing WHERE address_id = ?'
      listingData = await connection.query(sql,addressId)
      listingId = listingData[0][0].listing_id;
      //Inserting state location
      await insertLocation(connection,data.locations.state)
      stateId = await getLocationByNameID(connection,data.locations.state.name_id)
      locations_listings.push([stateId,listingId])
      //Inserting county location
      data.locations.county.parent_id = stateId;
      await insertLocation(connection,data.locations.county)
      countyId = await getLocationByNameID(connection,data.locations.county.name_id)
      locations_listings.push([countyId,listingId])
      //Inserting city location
      data.locations.city.parent_id = countyId;
      await insertLocation(connection,data.locations.city)
      cityId = await getLocationByNameID(connection,data.locations.city.name_id)
      locations_listings.push([cityId,listingId])
      //Inserting neighborhood location if exists
      if(locationData.locations.neighborhood){
        data.locations.neighborhood.parent_id = cityId;
        await insertLocation(connection,data.locations.neighborhood)
        neighborhoodId = await getLocationByNameID(connection,data.locations.neighborhood.name_id)
        locations_listings.push([neighborhoodId,listingId])
      }
      //Inserting zipcode location
      data.locations.zipcode.parent_id = cityId;
      await insertLocation(connection,data.locations.zipcode)
      zipcodeId = await getLocationByNameID(connection,data.locations.zipcode.name_id)
      locations_listings.push([zipcodeId,listingId])
      //Inserting route location
      data.locations.route.parent_id = cityId;
      await insertLocation(connection,data.locations.route)
      routeId = await getLocationByNameID(connection,data.locations.route.name_id)
      locations_listings.push([routeId,listingId])
      //Batch Inserting into locations_listings
      sql = 'INSERT IGNORE INTO locations_listings (location_id,listing_id) VALUES ?;';
      await connection.query(sql,[locations_listings])
      //Batch inserting image paths
      const imagePaths = []
      req.body.images.forEach((image)=>{
        imagePaths.push([image,listingId])
      })
      sql = 'INSERT IGNORE INTO imagepath (image_path,listing_listing_id) VALUES ?;';
      await connection.query(sql,[imagePaths])

      res.status(200).send('listing submitted')

      connection.commit(connection.release())
    } catch(err) {
      //res.send(err)
      res.status(400).send(`error: ${err.message}`)
      throw err
      connection.rollback(()=>connection.release())
    }
  }
})

module.exports = router;
