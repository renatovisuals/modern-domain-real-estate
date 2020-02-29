const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const mysql = require('mysql')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const locationsRoutes = require('./routes/locations');
const listingsRoutes = require('./routes/listings')
const searchRoutes = require('./routes/listings')

app.use('/api/locations',locationsRoutes);
app.use('/api/listings',listingsRoutes);
app.use('/api/search',searchRoutes);



if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}




app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
