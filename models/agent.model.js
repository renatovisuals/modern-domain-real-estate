const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
  firstName:{
    type: String,
    required: true,
    trim: true
  },
  lastName:{
    type: String,
    required: true,
    trim: true
  },
  qualifications:{
    type: Array,
    required: true
  },
  email:{
    type: String,
    required: false,
    unique:true,
    trim:true
  },
  phone:{
    type: String,
    required: true,
    unique:true,
    trim:true
  },
  fax:{
    type: String,
    required: true,
    unique:true,
    trim:true
  },
  street:{
    type: String,
    required: true,
    trim:true
  },
  city:{
    type: String,
    required: true,
    trim:true
  },
  state:{
    type: String,
    required: true,
    trim:true
  },
  image:{
    type: String,
    required: true,
    trim:true
  },
  zipcode:{
    type: Number,
    required: true,
  },
  featured:{
    type: Boolean
  }
}, {
  timestamps: true,
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
