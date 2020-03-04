const mysql =require('mysql2/promise');
const router = require('express').Router();
const axios = require('axios');
const mysqlSettings = require('../dbsettings')
const pool = mysql.createPool(mysqlSettings)
const Fuse = require('fuse.js')

const fuseOptions = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "first_name",
    "last_name"
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

  if(params.id){
    conditions.push("location_id = ?")
    values.push(params.id)
  }

  return {
    where: conditions.length ? conditions.join(' AND ') : '1',
    values: values
  }
})



router.route('/get/').get((req,res)=>{
  const limit = parseFloat(req.query.limit) || 10;
  const searchQuery = req.params.searchQuery
  let sql = 'SELECT * FROM agent'
  pool.query(sql)
  .then((agentResults)=>{
    const fuse = new Fuse(agentResults[0],fuseOptions)
    const result = fuse.search(req.query.searchQuery)
    const resultLimited = result.slice(0,limit)
    res.json(resultLimited)
  })
})


router.route('/add/').post((req,res)=>{
  let sql;
  const agent = {
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    phone:req.body.phone,
    fax:req.body.fax,
    street:req.body.street,
    city:req.body.city,
    state:req.body.state,
    image:req.body.image,
    zipcode:req.body.zipcode,
    featured:req.body.featured
  }

  const postData = async ()=>{
    const connection = await pool.getConnection()
    try{
      await connection.beginTransaction()

      sql = 'INSERT IGNORE INTO agent SET ?';
      await connection.query(sql,agent)

      sql = 'SELECT agent_id FROM agent WHERE first_name = ? AND last_name = ?';
      //sql = 'SELECT * FROM agent';
      const agentId = await connection.query(sql,[agent.first_name,agent.last_name])

      sql = 'INSERT IGNORE INTO qualification (type) VALUES ?'
      await connection.query(sql,[req.body.qualifications.map(q=>[q])])

      sql = `SELECT * FROM qualification WHERE type IN (?)`
      const qualifications = await connection.query(sql,[req.body.qualifications])
      //res.json(qualifications[0])

      const agents_qualifications = qualifications[0].map((qualification)=>{
        return [qualification.qualification_id,agentId[0][0].agent_id]
      })
      console.log(agents_qualifications)
      res.json(agents_qualifications)

      sql = `INSERT INTO agents_qualifications (qualification_id,agent_id) VALUES ?`
      await connection.query(sql,[agents_qualifications])

      connection.commit(connection.release())
    }catch(err){
      console.error(err)
      connection.release(()=>{
        res.status(400).send(`error: ${err.message}`)
      })
    }
  }
  postData()

})




module.exports = router;
