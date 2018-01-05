const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String
});

module.exports = mongoose.model('products', productSchema);
