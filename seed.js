require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Product = require('./models/Product');

const users = [
  { email: 'admin@test.com', password: 'password123' },
  { email: 'user@test.com', password: 'password456' }
];

const products = [
  { nombre: 'Alimento para Gato Adulto', existencias: 50, stock_minimo: 10 },
  { nombre: 'Alimento para Perro Cachorro', existencias: 120, stock_minimo: 20 },
  { nombre: 'Snack de Pescado', existencias: 30, stock_minimo: 5 },
  { nombre: 'Alimento para Perro Pequeño', existencias: 25, stock_minimo: 5 },
  { nombre: 'Alimento para Gato Pequeño', existencias: 75, stock_minimo: 5 }

];

const seedDB = async () => {
  try {
    // Conexión a la base de datos
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Conectado a la base de datos para sembrar datos...');

    // Limpiar las colecciones existentes para evitar duplicados
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Colecciones limpiadas.');

    // Encriptar contraseñas antes de guardar los usuarios
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    // Insertar usuarios y productos
    await User.insertMany(users);
    await Product.insertMany(products);
    console.log('Datos de usuarios y productos insertados con éxito.');
  
  } catch (error) {
    console.error('Error al sembrar la base de datos:', error);
  } finally {
    // Desconectar al terminar, sin importar el resultado
    mongoose.disconnect();
    console.log('Desconectado de la base de datos.');
  }
};

seedDB();