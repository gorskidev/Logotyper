const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    id: Number,
    brandname: String,
    brandspec: String,
    description: String,
    price: Number,
    imgs: Array,
    byUser: String,
  },
  { 
    timestamps: true 
  },
  {
    collection: 'orders'
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Order", DataSchema);