const mysql =require('mysql2/promise');
const router = require('express').Router();
const axios = require('axios');
const mysqlSettings = require('../dbsettings')
const pool = mysql.createPool(mysqlSettings)
const mapLocationParents = require("../helpers/locationParents");
const Fuse = require('fuse.js')

const fuseOptions = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  includeScore:true,
  useExtendedSearch: true,
  includeMatches:true,
  keys: [
    "name",
    "first_name",
    "last_name",
    "formatted_address"
  ]
};

router.route('/get').get((req,res)=>{
  const limit = 5;
  const getSearchResults = async ()=>{
    try{

      if(!req.query.search_query) throw new Error('search_query param required')
      const connection = await pool.getConnection()
      let searchResults = {}

      //Get all locations
      let sql = "SELECT * FROM location_parents";
      const locationData = await connection.query(sql)
      const locations = mapLocationParents(locationData[0])

      //Get all agents
      sql = "SELECT * FROM agent";
      const agentData = await connection.query(sql)
      const agents = agentData[0]

      sql = "SELECT * FROM address";
      const addressData = await connection.query(sql)
      const address = addressData[0]
      //Instantiating fuse search library
      const locationFuse = new Fuse(locations,fuseOptions)
      const agentFuse = new Fuse(agents,fuseOptions)
      const addressFuse = new Fuse(address,fuseOptions)

      //Searching for data relevant to search query and appending it to searchResults
      let locationResults = locationFuse.search(`^${req.query.search_query}`)
      console.log(locationResults,"location results");
      locationResults = locationResults.slice(0,limit)
      if(locationResults.length>0) searchResults.locations = locationResults;

      let agentResults = agentFuse.search(`^${req.query.search_query}`)
      agentResults = agentResults.slice(0,limit)
      if(agentResults.length>0) searchResults.agents = agentResults;

      const regex = /^\d+\s\w/gm
      if(req.query.search_query.match(regex)){
        console.log(req.query.search_query,"search query")
        let addressResults = addressFuse.search(req.query.search_query)
        addressResults = addressResults.slice(0,limit)
        if(addressResults.length>0) searchResults.addresses = addressResults;
      }

      connection.release()

      res.json(searchResults)

    }catch(err){
      res.status(500).send(`error: ${err.message}`)
    }


    //res.json(agents)
  }
  getSearchResults()
})




module.exports = router;
