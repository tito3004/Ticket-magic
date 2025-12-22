const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const emailService = require('../services/email.service');
const paypalService = require('../services/paypal.service');

// Controlador: Crear usuario y enviar correos de verificación y bienvenida
exports.createUser = async (req, res) => {
  const { correo } = req.body;
  try {
    const verificationToken = jwt.sign(
      { correo },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );
    const verificationLink = `http://localhost:8100/verificado?token=${verificationToken}`;
    const user = await userService.create(req.body);
    await emailService.sendMail(user.correo, 'Verifica tu cuenta',
      `
        <h2>Hola ${user.nombres},</h2>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>Este enlace expirará en 30 minutos.</p>
      `
    );
    await emailService.sendMail(user.correo,
      'Bienvenido a TicketMagic',
      `<h1>Hola ${user.nombres}!</h1><p>Gracias por registrarte.</p>`
    );
    res.status(201).json({
      status: true,
      message: 'Usuario creado. Verifica tu correo para activar tu cuenta.'
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      const detalle = error?.parent?.detail || '';
      const match = detalle.match(/\(([^)]+)\)=\(([^)]+)\)/);
      if (match) {
        const campo = match[1];
        const valor = match[2];
        return res.status(409).json({
          status: false,
          message: `Ya existe ${campo} = ${valor}.`
        });
      }
      res.status(400).json({ error: error.message });
    }
  }
};

// Controlador: Enviar enlace para restaurar contraseña
exports.restaurar_password = async (req, res) => {
  const { correo } = req.body;
  try {
    const reustaurarToken = jwt.sign(
      { correo },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );
    const reustaurarlink = `http://localhost:8100/recuperando?token=${reustaurarToken}`;
    await emailService.sendMail(correo, 'Restaura tu contraseña',
      `
        <h2>Hola, aqui esta tu enlace de restauracion</h2>
        <p>Haz clic en el siguiente enlace para restaurar tu cuenta:</p>
        <a href="${reustaurarlink}">${reustaurarlink}</a>
        <p>Este enlace expirará en 30 minutos.</p>
      `
    );
    res.status(201).json({
      status: true,
      message: 'Correo con link para restauración.'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Recibir formulario de inconvenientes
exports.formulario_incovenientes = async (req, res) => {
  try {
    userService.formulario_incovenientes_s(req, res);
    res.status(201).json({
      status: true,
      message: 'Formulario de incovenientes enviado, soporte se contactara con usted'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Comprar boletos y generar enlace de pago
exports.compra_boletos = async (req, res) => {
  try {
    const { cantidad, localidad, id_fecha, id_hora, id_evento } = req.body;
    const usuario = req.userId;
    const { total, cod_unico_boleto } = await userService.compra_boleto_s(
      cantidad, localidad, id_fecha, id_hora, id_evento, usuario
    );
    if (!total) {
      return res.status(400).json({ error: 'Error al comprar boletos' });
    }
    const link = await paypalService.paypal_api_link(total, cod_unico_boleto);
    res.status(201).json({
      status: true,
      message: 'Boletos generados correctamente',
      cod_unico_boleto,
      total,
      link
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Cancelar boleto
exports.cancelar_boleto = async (req, res) => {
  try {
    const { cod_unico_boleto } = req.query;
    await userService.cancelar_boleto_s(cod_unico_boleto);
    res.status(201).json({
      status: true,
      message: 'boleto cancelado'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Obtener resumen de compra por código
exports.getResumenPorCodigo = async (req, res) => {
  try {
    const { cod_unico_boleto } = req.query;
    const filas = await userService.consultaResumenPorCodigo(cod_unico_boleto);
    return res.status(200).json({
      status: true,
      message: 'Resumen de compra',
      data: filas 
    });
  } catch (error) {
    return error;
  }
};

// Controlador: Obtener compras de un usuario
exports.getResumenPorUsuario = async (req, res) => {
  try {
    const filas = await userService.consultaResumenPorUsuario(req, res);
    return res.status(200).json({
      status: true,
      message: 'Compras del usuario',
      data: filas
    });
  } catch (error) {
    console.log(error);
  }
};

// Controlador: Confirmar compra de boleto y enviar correo
exports.consultar_boleto = async (req, res, next) => {
  try {
    const { cod_unico_boleto, token } = req.query;
    await paypalService.capture_order(token);
    const response = await userService.consultar_boleto_s(cod_unico_boleto);
    if (response) {
      const correo = req.correo;
      if (!correo) {
        const e = new Error('El resultado no contiene la columna "correo"');
        e.statusCode = 422;
        throw e;
      }
      await emailService.sendMail(
        correo,
        'Has comprado tus boletos',
        'Felicidades, tu pago se comprobó y se ha realizado tu compra'
      );
    }
    return res.status(200).json({
      status: true,
      message: 'Felicidades, tu pago se comprobó y se ha realizado tu compra'
    });
  } catch (error) {
    return next(error);
  }
};
