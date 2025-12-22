//Librerias nesarias para el manejo de rutas y llamadas a Middleware, valivaciones y contoladores
const publicController = require('../controllers/public.controller');
const express = require('express');
const router = express.Router();
const path = require('path');
//defenciion de rutas de tipo publicas que llaman a sus respectivos servicios, middelware y validaciones
router.get('/consulta_eventos', publicController.consulta_eventos);
router.use('/images', express.static(path.resolve(__dirname, '../../images')));


module.exports = router;
