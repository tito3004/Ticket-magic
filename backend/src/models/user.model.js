//librerias necesarias para el manejo de un modelo de una tabla usuario
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
//definimos el modelo
const User = sequelize.define('usuario', {
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  cedula: {
    type: DataTypes.CHAR,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false
  },
  verificado: {
  type: DataTypes.BOOLEAN,
  defaultValue: false
}
},{
  tableName: 'usuario',
  freezeTableName: true
});
//exportamos
module.exports = User;
