const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host :process.env.DB_HOST,
  user :process.env.DB_USER,
  password:process.env.DB_PASS,
  database:'heroku_925257397425112',
  multipleStatements:true
})

connection.connect((err,res)=>{
  if(err){
    throw err
  }
  console.log("MySql Connected",res)
})


app.get('/test', (req,res)=>{
  axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${process.env.GOOGLE_API_KEY}`)
      .then((info)=>res.json(info.data),"this is the data")
      .catch((err)=>console.log(err))
})

/*
app.get('/api/listings',(req,res)=>{
  let sql = "SELECT * FROM location"
  connection.query(sql,(err,result) => {
    if(err) throw err;
    res.json(result);
    console.log(result)
  })
})
*/

const listingRoutes = require('./routes/listings')
const locationRoutes = require('./routes/locations')


app.use('/api/listings',listingRoutes);
app.use('/api/locations',locationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}




app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
