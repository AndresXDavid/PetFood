const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  existencias: { type: Number, required: true, default: 0 },
  stock_minimo: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Product', productSchema);