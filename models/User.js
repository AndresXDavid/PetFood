// Usando Mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Aquí guardaremos el hash
});

module.exports = mongoose.model('User', userSchema);