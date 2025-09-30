const { Sequelize } = require('sequelize');

// Carga las credenciales desde las variables de entorno
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = 'postgres'; // O 'mysql', 'mssql', etc.

// Crea una instancia de Sequelize
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false, // Desactiva los logs de Sequelize
});

// Autentica y verifica la conexión
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Sale del proceso con un error
  }
}

connectDB();

module.exports = sequelize;