const mysql = require('mysql');
const db = require("../db.js");
const router = require('express').Router();
const axios = require('axios');


router.route('/').get((req,res)=>{
  connection = db.createConnection()
  connection.connect((err)=>{
    if(err){
      throw err
    }
    const sql = "SELECT * FROM zoo"
    connection.query(sql,(err,result) => {
      if(err) throw err;
      res.json(result);
      console.log(result)
    })
    connection.end()
  })

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
    description:req.body.description
  }
  const nameTypes = {
    street_number:"street_number",
    political:"political",
    administrative_area_level_2:"county",
    administrative_area_level_1:"state",
    country:"country",
    route:"route",
    locality:"city",
    postal_code:"zipcode"
  }
  const { city,state,street,apt,zipcode } = listing
  const address = encodeURIComponent(`${street} ${listing.apt ? "apt "+listing.apt+" " :''}${city} ${state}`)
  let locationData = {}

  const formatData = (data)=>{
  let formattedData = {
    locations:[],
    formatted_address:'',
    lat_long:{
      lat:null,
      long:null
    }
  }
  let a = data[0].address_components;
  a.forEach((location)=>{
    let name_id;
    let type = nameTypes[location.types[0]]
      formattedData.locations.push({
        type:type,
        short_name:location.short_name,
        long_name:location.long_name
      })
  })
  for(let i = 0; i < formattedData.locations.length; i++){
    let loc = formattedData.locations[i];
    if(loc.type === "city"){
      loc.name_id = `${loc.long_name.toLowerCase().replace(" ","-")}-${listing.state.toLowerCase()}`;
    }
  }
  return formattedData
}

  axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAGgm00r51Xpx2wUfWvvKUMNWd6GrjV6Ck")
  .then((res)=>{
    locationData = formatData(res.data.results)
    console.log(locationData,"location data")
    postData()
  })
  .catch((err)=>console.log(err))

  const postData = ()=>{
    connection = db.createConnection()
    connection.connect((err)=>{
      if(err){
        throw err
      }
      res.send("hello")
      connection.end()
    })
  }

})

  //db.end(()=> console.log("connection ended"))

module.exports = router;
