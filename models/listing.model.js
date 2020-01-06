const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  buildingtype:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  },
  street:{
    type: String,
    required: true
  },
  apt:{
    type: Number,
  },
  zip:{
    type: Number,
    required: true
  },
  position:{
    type: Object,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  estpayment:{
    type: Number,
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
  sqft:{
    type: Number,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  yearbuilt:{
    type:Number,
    required: true
  },
  heating:{
    type: String,
    required: true
  },
  cooling:{
    type: String,
    required: true
  },
  parking:{
    type: Number,
    required: true
  },
  lot:{
    type: Object,
    required: true
  },
  pricepersqft:{
    type: Number,
    required: true
  },
  imagepath:{
    type:String,
    required:true
  },
  images:{
    type: Array,
    required: true
  },
  locationQuery:{
    type:String,
    required: false
  },
  description:{
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
