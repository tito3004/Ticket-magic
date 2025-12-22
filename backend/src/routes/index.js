//librerias necesarias
const express = require('express');
const router = express.Router();
//llamado a todas las rutas
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const publicRoutes = require('./public.routes');
//definimos las rutas raiz de cada apartado
router.use('/auth', authRoutes);
router.use('/usuario', userRoutes);
router.use('/admin', adminRoutes);
router.use('/public', publicRoutes);

module.exports = router;
