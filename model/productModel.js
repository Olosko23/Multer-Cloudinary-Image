const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    publicUrl: String,
    fileName: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
