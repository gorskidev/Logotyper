const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    imgPath: {
        type: String
    },
    author: String,
    author_id: String,
    title: String,
    category: String,
    price: Number,
    tags: Array
  },
  { 
    timestamps: true 
  },
  {
    collection: 'gallery'
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Image", DataSchema);