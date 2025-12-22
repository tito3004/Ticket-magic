//llamamos a libreria necesaria para el manejo de base de datos
const { Sequelize } = require('sequelize');
//defenimos la conexion a la base de datos tipo postgres
const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
