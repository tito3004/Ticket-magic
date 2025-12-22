//Librerias nesarias para el manejo de rutas y llamadas a Middleware, valivaciones y contoladores
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { body } = require('express-validator');
//defenciion de rutas de usuarios que llaman a sus respecctivos servicios, middelware y validaciones
router.get('/consulta_usuarios', authMiddleware, adminController.getAllUsers);
router.post('/agregar_artista', [
    body('genero').notEmpty().withMessage('El genero del artista  es requerido'),
    body('nombre_artista').notEmpty().withMessage('El nombre del artista es requerido'),
    body('tipo_artista').notEmpty().withMessage('Identifique que tipo de artista es')
], validate, authMiddleware, adminController.agregar_artista);
router.post('/agregar_lugar', [
    body('nombre_lugar').notEmpty().withMessage('El nombre del lugar es requerido'),
    body('capacidad').notEmpty().withMessage('Ingrese la capacidad del lugar'),
    body('nombre_ciudad').notEmpty().withMessage('Ubique el nombre de la ciudad'),
    body('nombre_pais').notEmpty().withMessage('Ubique el nombre del pais'),
    body('json_asientos').notEmpty().withMessage('No ha agregadfo asientos'),
], validate, authMiddleware, adminController.agregar_lugar);
router.post('/generar_eventos', authMiddleware, adminController.generar_eventos);
router.get('/consultar_lugares',  adminController.consultar_lugares);
router.get('/consultar_artista', adminController.consultar_artista);
router.post('/reporte_boletos', authMiddleware, adminController.generar_reportes_boletos);
router.get('/consulta_pagos', authMiddleware, adminController.getAllUsers);
router.post('/cancelar_eventos', [
    body('nombre_evento').notEmpty().withMessage('El nombre del evento es requerido')],
 authMiddleware, adminController.cancelar_evento);
router.post('/comprobar_boletos', [
    body('cod_unico_boleto').notEmpty().withMessage('Ingrese los boletos a comprobar')],
 authMiddleware, adminController.comprobar_codigo);


module.exports = router;
