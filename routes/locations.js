const mysql = require('mysql');
const router = require('express').Router();
const axios = require('axios');
const mysqlSettings = require('../dbsettings')
const pool = mysql.createPool(mysqlSettings)

const buildConditions = ((params)=>{
  let conditions = [];
  let values = [];
  let conditionsStr

  if(params.type){
    conditions.push("location_type = ?")
    values.push(params.type)
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

    pool.query(sql,conditions.values, function (error, results, fields) {
      if (error) throw error;
      const data = results
      const updatedLocations = data.map((location)=>{
        let loc = {}
        loc.location_id = location.location_id
        loc.location_type = location.location_type
        loc.name = location.name
        loc.name_id = location.name_id
        if(location.parent_id){
          loc.parents = []
          if(location.parent_1){
            loc.parents.push({
              location_id:location.parent_1_location_id,
              location_type:location.parent_1_location_type,
              name:location.parent_1,
              name_id:location.parent_1_name_id,
              parent_id:location.parent_1_parent_id
            })
          }
          if(location.parent_2){
            loc.parents.push({
              location_id:location.parent_2_location_id,
              location_type:location.parent_2_location_type,
              name:location.parent_2,
              name_id:location.parent_2_name_id,
              parent_id:location.parent_2_parent_id
            })
          }
          if(location.parent_3){
            loc.parents.push({
              location_id:location.parent_3_location_id,
              location_type:location.parent_3_location_type,
              name:location.parent_3,
              name_id:location.parent_3_name_id
            })
          }
        }

        return loc
      })
      res.json(updatedLocations)
      //res.send('hello')
    });
})



module.exports = router;
