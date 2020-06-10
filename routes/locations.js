const mysql = require('mysql');
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
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name"
  ]
};


const buildConditions = ((params)=>{
  let conditions = [];
  let values = [];
  let conditionsStr

  if(params.type){
    conditions.push("location_type = ?")
    values.push(params.type)
  }

  if(params.name){
    conditions.push("name = ?")
    values.push(params.name)
  }

  if(params.name_id){
    conditions.push("name_id = ?")
    values.push(params.name_id)
  }

  if(params.id){
    conditions.push("location_id = ?")
    values.push(params.id)
  }

  return {
    where: conditions.length ? conditions.join(' AND ') : '1',
    values: values
  }
})


router.route('/get/:type').get((req,res)=>{
  const type = req.params.type
  const sql = 'SELECT name,location_id, parent_id FROM location WHERE location_type = ?'
  pool.query(sql,type, function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  });
})


router.route('/get/').get((req,res)=>{
    const conditions = buildConditions(req.query);
    const sql = 'SELECT * FROM location_parents WHERE ' + conditions.where
    const limit = parseFloat(req.query.limit) || 10;

    console.log(limit,"this is the limit")

    pool.query(sql,conditions.values, function (error, results, fields) {
      if (error) throw error;
      const data = mapLocationParents(results)
      if(req.query.searchQuery){
        const fuse = new Fuse(data,fuseOptions)
        const result = fuse.search(req.query.searchQuery)
        const resultLimited = result.slice(0,limit)
        res.json(resultLimited)
      }else{
        res.json(data)
      }

    });
})



module.exports = router;
