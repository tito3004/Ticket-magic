//Librerias nesarias para el manejo de rutas y llamadas a Middleware, valivaciones y contoladores
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
//defenciion de rutas de usuariosque llaman a sus respectivos servicios, middelware y validaciones
router.post(
  '/registro',
  [
  body('nombres').notEmpty().withMessage('El nombre es requerido'),
  body('apellidos').notEmpty().withMessage('El apellido es requerido'),
  body('correo').isEmail().withMessage('Correo inválido'),
  body('cedula')
    .notEmpty().withMessage('La cédula es requerida')
    .isLength({ min: 10, max: 10 }).withMessage('La cédula debe tener 10 dígitos'),
  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
]
,
  validate,
  userController.createUser
);
router.get('/consulta_boleto',authMiddleware,userController.consultar_boleto);
router.post('/formulario_incovenientes',
  [
  body('nombre_inconveniente').notEmpty().withMessage('Especifique su incoveniente'),
  body('descripcion').notEmpty().withMessage('Ubique una descripcion de si problema')
]
,
  validate,
  authMiddleware,
  userController.formulario_incovenientes

);
router.post('/restaurar_cuenta',
  [
  body('correo').isEmail().withMessage('Correo inválido')
]
,
  validate,
  userController.restaurar_password
);
router.get('/eliminar_boletos', authMiddleware,userController.cancelar_boleto);
router.post('/compra_boletos',
  [
    body('cantidad').isInt({ min: 1 }).withMessage('Debe ingresar al menos 1 boleto'),
    body('localidad').notEmpty().withMessage('Debe seleccionar una localidad'),
    body('id_fecha').notEmpty().withMessage('Seleccione la fecha'),
    body('id_hora').notEmpty().withMessage('Seleccione la hora'),
    body('id_evento').notEmpty().withMessage('Seleccione el evento')
  ],
  validate,
  authMiddleware,
  userController.compra_boletos
);
router.get('/consulta_boletos_qr', authMiddleware,userController.getResumenPorCodigo);
router.get(
  '/consulta_boletos_por_usuario',
  authMiddleware,
  userController.getResumenPorUsuario
);
module.exports = router;
