const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeSchema = new Schema({
  hometype:{
    type: String,
    required: true
  },
  bedrooms:{
    type: Number,
    required: true
  },
  bathrooms:{
    type: Number,
    required: true
  },
}, {
  timestamps: true,
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
