const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const db = require('./config/db');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

const cors = require('cors');

//restricciones nesesarias para la api
app.use(cors({
    allowedOrigins: ['http://localhost:4200','http://localhost:8100', 'https://ticket-magic.vercel.app'], // Dirección del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));
app.options('*', cors());
//configuraciones necesarias
app.use(express.json());
app.use(morgan('dev'));
//conprueba que la configuracion de la base de datos haya sido exitosa
db.sync().then(() => console.log('Conectado a PostgreSQL'));
//routas principales
app.use('/sistema_reserva', routes);
//llama al middleware que comprueba si hay un fallo del lado del servidor
app.use(errorHandler);
//exporta el modulo para su uso en otros archivos
module.exports = app;
