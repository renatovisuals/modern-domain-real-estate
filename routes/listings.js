const router = require('express').Router();
let Listing = require('../models/listing.model');

router.route('/').get((req,res) => {
  query = {}
  if(req.query.location) query.queryString = req.query.location;
  if(req.query.price) query.price = req.query.price;
  if(req.query.minbedrooms) query.bedrooms = {$gte:req.query.minbedrooms};
  if(req.query.minbathrooms) query.bathrooms = {$gte:req.query.minbathrooms};

  Listing.find(query)
    .then(listings => {
      if(req.query){
        //console.log("query")
      }
      return res.json(listings)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:city/:bedrooms/:bathrooms').get((req,res) => {
  console.log('retrieving users')
  Listing.find()
    .then(listings => res.json(listings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res)=> {
  const buildingtype = req.body.buildingtype;
  const city = req.body.city.toLowerCase();
  const state = req.body.state.toLowerCase();
  const street = req.body.street;
  const apt = req.body.apt;
  const zip = req.body.zip;
  const position = req.body.position;
  const price = req.body.price;
  const estpayment = req.body.estpayment;
  const bedrooms = req.body.bedrooms;
  const bathrooms = req.body.bathrooms;
  const sqft = req.body.sqft;
  const type = req.body.type;
  const yearbuilt = req.body.yearbuilt;
  const heating = req.body.heating;
  const cooling = req.body.cooling;
  const parking = req.body.parking;
  const lot = req.body.lot;
  const pricepersqft = req.body.pricepersqft;
  const imagepath = req.body.imagepath;
  const images = req.body.images;
  const description = req.body.description;
  //const queryString =req.body.queryString;

  const locationQueryStr = ()=>{
    const cityQuery = city.replace(" ","%20")
    return cityQuery + "%20" + state;
  }
  //const bedrooms = Number(req.body.bedrooms);
  //const bathrooms = Number(req.body.bathrooms);

  const newListing = new Listing({
    buildingtype,
    city,
    state,
    street,
    apt,
    zip,
    position,
    price,
    estpayment,
    bedrooms,
    bathrooms,
    sqft,
    type,
    yearbuilt,
    heating,
    cooling,
    parking,
    lot,
    pricepersqft,
    imagepath,
    images,
    description,
    locationQueryStr:locationQueryStr()
  })

  newListing.save()
    .then(()=> res.json('listing added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
