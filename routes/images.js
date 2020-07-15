const mysql =require('mysql2/promise');
const router = require('express').Router();
const axios = require('axios');
const mysqlSettings = require('../dbsettings')
const pool = mysql.createPool(mysqlSettings)



const buildConditions = ((params)=>{
  let conditions = [];
  let values = [];
  let conditionsStr

  if(params.id){
    conditions.push("listing_id = ?")
    values.push(params.id)
  }

  return {
    where: conditions.length ? conditions.join(' AND ') : '1',
    values: values
  }
})



router.route('/get/').get((req,res)=>{
  const getImages = async ()=>{
    const limit = parseFloat(req.query.limit) || 10;
    const searchQuery = req.params.search_query
    const conditions = buildConditions(req.query);
    const sql = 'SELECT * FROM imagepath WHERE ' + conditions.where;
    const images = await pool.query(sql,[conditions.values])

    res.json(images)
  }
  getImages()
})
