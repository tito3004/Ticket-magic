//Librerias nesarias para el manejo de rutas y llamadas a Middleware, valivaciones y contoladores
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth.controller');
//defenciion de rutas de autentificacion que llaman a sus respectivos servicios, middelware y validaciones
router.post('/login', authController.login);
router.get('/verificar', authController.verificarCuenta);
router.post('/restaurar',[
    body('correo').isEmail().withMessage('Correo inválido'),
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
     ],authController.restaurarPassword);


module.exports = router;
