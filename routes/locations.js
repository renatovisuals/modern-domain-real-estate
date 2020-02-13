const mysql = require('mysql');
const db = require("../db.js");
const router = require('express').Router();


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
  connection = db.createConnection()
  connection.connect((err)=>{
    if(err){
      throw err
    }
  console.log(req.body,"this is the POST")
  res.json(req.body.data)
  //const sql = "SELECT * FROM zoo"
  //db.query(sql,(err,result) => {
  //  if(err) throw err;
  //  res.json(result);
  //  console.log(result)
  })
})

  //db.end(()=> console.log("connection ended"))

module.exports = router;
