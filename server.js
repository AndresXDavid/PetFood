require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

// Importa las rutas
const publicRoutes = require('./routes/public');
const privateRoutes = require('./routes/private');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware para procesar JSON
app.use(express.json());
app.use(cors()); 

app.use(express.static('public'));

// Conexión a la base de datos
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Conexión a MongoDB exitosa.');
    // Inicia el servidor solo si la conexión a la DB es exitosa
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos', err);
    process.exit(1); // Sale del proceso si no puede conectar
  });

// Rutas de la API
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', privateRoutes); // Las rutas privadas ya tienen su middleware interno