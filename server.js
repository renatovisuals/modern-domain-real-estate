const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex:true });

const connection = mongoose.connection;
connection.once('open',()=> {
  console.log("MongoDB database connection established successfully");
})

const listingsRouter = require('./routes/listings');
const agentRouter = require('./routes/agents');

app.use('/api/listings', listingsRouter);
app.use('/api/agents', agentRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}




app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
