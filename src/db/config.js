const mysql = require('mysql2');

// Configura la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

// Crea una conexión a la base de datos
const conexion = mysql.createConnection(dbConfig);

// Conecta a la base de datos
conexion.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

// Exporta la conexión para que pueda ser utilizada en otros módulos
module.exports = conexion;