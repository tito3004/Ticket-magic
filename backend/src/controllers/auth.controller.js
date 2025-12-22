// Controlador de autenticación y cuentas: verifica cuentas, restaura contraseñas e inicia sesión
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const emailService = require('../services/email.service');
const userService = require('../services/user.service');

// Controlador: Verificar cuenta de usuario con token de correo
exports.verificarCuenta = async (req, res) => {
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const correo = decoded.correo;
    const usuario = await User.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ status: false, message: 'Usuario no encontrado' });
    }
    if (usuario.verificado) {
      return res.status(203).json({ status: false, message: 'Tu cuenta ya había sido verificada' });
    }

    usuario.verificado = true;
    await usuario.save();
    return res.status(200).json({ status: true, message: 'Tu cuenta ha sido verificada correctamente' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: 'El enlace de verificación ha expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      if (error.message === 'invalid signature') {
        return res.status(401).json({ status: false, message: 'Token inválido: la firma no coincide' });
      }
      return res.status(401).json({ status: false, message: 'Token inválido' });
    } else {
      return res.status(400).json({ status: false, message: 'Error al verificar el token' });
    }
  }
};

// Controlador: Restaurar contraseña usando token enviado por correo
exports.restaurarPassword = async (req, res) => {
  const token = req.query.token;
  const { password } = req.body;
  try {
    if (!token) {
      return res.status(400).json({ status: false, message: 'Token no proporcionado' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const correo = decoded.correo;

    if (!password || password.length < 6) {
      return res.status(400).json({ status: false, message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const actualizado = await userService.restaurar({ correo, password });
    if (!actualizado) {
      return res.status(404).json({ status: false, message: 'Usuario no encontrado o enlace inválido' });
    }
    return res.status(200).json({ status: true, message: '¡Tu contraseña ha sido restaurada correctamente!' });
  } catch (error) {
    console.error('Error al restaurar la contraseña:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ status: false, message: 'El enlace de restauración ha expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: false, message: 'Token inválido o alterado' });
    }
    return res.status(400).json({ status: false, message: 'Error al procesar la restauración. Contacte con soporte' });
  }
};

// Controlador: Iniciar sesión con validación de credenciales
exports.login = async (req, res) => {
  const { correo, password } = req.body;
  const usuario = await User.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  if (!usuario.verificado) {
    return res.status(401).json({ message: 'Usuario no verificado, por favor verifica tu correo' });
  }
  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  await emailService.sendMail(
    usuario.correo,
    'Has iniciado sesión',
    `<h1>Hola ${usuario.nombres}!</h1><p>Es un gusto tenerte de vuelta. Si no fuiste tú, contacta con el soporte.</p>`
  );

  const token = jwt.sign(
    {
      userId: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombres,
      rol: usuario.admin ? 'admin' : 'usuario'
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.status(200).json({
    status: true,
    token,
    usuario: {
      id: usuario.id,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      cedula: usuario.cedula,
      createdAt: usuario.createdAt
    },
    rol: usuario.admin ? true : false
  });
};
