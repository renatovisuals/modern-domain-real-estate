const mysql =require('mysql2/promise');
const router = require('express').Router();
const axios = require('axios');
const mysqlSettings = require('../dbsettings')
const pool = mysql.createPool(mysqlSettings)



const buildConditions = ((params)=>{
  let conditions = [];
  let values = [];
  let conditionsStr

  if(params.listing_id){
    conditions.push("listing_listing_id = ?")
    values.push(params.listing_id)
  }

  return {
    where: conditions.length ? conditions.join(' AND ') : '1',
    values: values
  }
})



router.route('/get/').get((req,res)=>{
  const getImages = async ()=>{
    const conditions = buildConditions(req.query);
    const sql = 'SELECT * FROM imagepath WHERE ' + conditions.where;
    pool.query(sql,[conditions.values])
    .then((results)=>{
      const imagePaths = results[0].map((result)=>{
        return result.image_path
      })

      return imagePaths
    })
    .then((images)=>res.json(images))
    .catch((err)=>{
      res.status(400).send(`error: ${err.message}`)
    })
  }
  getImages()
})

module.exports = router;
