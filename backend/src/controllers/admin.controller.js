// Controlador de administración: gestiona usuarios, artistas, lugares, eventos, reportes y validaciones
const emailService = require('../services/email.service');
const adminServices = require('../services/admin.services');
const excelService = require('../services/excel.service');
const uploadService = require('../services/upload_image.service');

// Controlador: Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    await emailService.sendMailAdminNotificacion(req, res);
    const users = await adminServices.findAll();
    res.status(200).json({status:true,users});
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Agregar artista
exports.agregar_artista = async (req, res) => {
  try {
    const { nombre_artista, tipo_artista, genero } = req.body;
    await emailService.sendMailAdminNotificacion(req, res);
    await adminServices.agregar_artista_s(nombre_artista, tipo_artista, genero);
    res.status(200).json({status:true, message: "Artista agregado correctamente" });
  } catch (error) {
    console.error('Error al agregar artista:', error);
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Consultar lugares
exports.consultar_lugares = async (req, res) => {
  try {
    await emailService.sendMailAdminNotificacion(req, res);
    const resultado = await adminServices.consultar_lugares_s();
    res.status(200).json({ status:true,message: "lugares disponibles:", value: resultado });
  } catch (error) {
    console.error('Error al consultar lugares:', error);
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Consultar artistas
exports.consultar_artista = async (req, res) => {
  try {
    await emailService.sendMailAdminNotificacion(req, res);
    const resultado = await adminServices.consultar_artista_s();
    res.status(200).json({ status:true,message: "artista disponibles:", value: resultado });
  } catch (error) {
    console.error('Error al consultar lugares:', error);
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Agregar lugar
exports.agregar_lugar = async (req, res) => {
  try {
    await emailService.sendMailAdminNotificacion(req, res);
    await adminServices.agregar_lugar_s(req, res);
    res.status(200).json({ status:true,message: "Lugar agregado correctamente" });
  } catch (error) {
    console.error('Error al agregar lugar:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Generar eventos con subida de imagen
exports.generar_eventos = async (req, res) => {
  uploadService.upload.single('imagen')(req, res, async function (err) {
    if (err) {
      console.error('Error al subir imagen:', err);
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No se subió ningún archivo' });
      }
      await emailService.sendMailAdminNotificacion(req, res);
      await adminServices.generar_evento_s(req, res);
      return res.status(200).json({
        status:true,
        message: 'Evento generado correctamente',
        archivo: req.file.filename
      });
    } catch (error) {
      console.error('Error al generar evento:', error);
      return res.status(500).json({ error: error.message });
    }
  });
};

// Controlador: Generar reportes de boletos y enviarlos por correo
exports.generar_reportes_boletos = async (req, res) => {
  try {
    await emailService.sendMailAdminNotificacion(req, res);
    const resultado = await adminServices.generar_reporte_boletos_s(req,res);
    if (Array.isArray(resultado) && resultado.length > 0) {
      const excelReporte = await excelService.generar_excel(resultado);
      await emailService.sendMail(
        req.correo,
        `Hola ${req.nombre}`,
        '<p>Aquí está el reporte de boletos.</p>',
        excelReporte
      );
    } else {
      await emailService.sendMail(
        req.correo,
        `Hola ${req.nombre}`,
        '<p>No hay reporte, no había boletos comprados.</p>'
      );
    }
    res.status(200).json({ status:true,message: "Reporte generado y enviado por correo." });
  } catch (error) {
    console.error('Error al generar o enviar el reporte:', error);
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Cancelar evento y enviar reporte
exports.cancelar_evento = async (req, res) => {
  try {
    const { nombre_evento } = req.body;
    await emailService.sendMailAdminNotificacion(req, res);
    await adminServices.cancelar_eventos_s(nombre_evento);
    const resultado = await adminServices.generar_reporte_cancelados_s(nombre_evento);
    if (Array.isArray(resultado) && resultado.length > 0) {
      const excelReporte = await excelService.generar_excel(resultado);
      await emailService.sendMail(
        req.correo,
        `Hola ${req.nombre}`,
        '<p>Aquí está el reporte de boletos del evento cancelado.</p>',
        excelReporte
      );
    } else {
      await emailService.sendMail(
        req.correo,
        `Hola ${req.nombre}`,
        '<p>El evento ha sido cancelado, no había boletos comprados.</p>'
      );
    }
    res.status(200).json({status:true, message: "Evento cancelado correctamente" });
  } catch (error) {
    console.error('Error al cancelar evento:', error);
    res.status(400).json({ error: error.message });
  }
};

// Controlador: Comprobar código de boleto
exports.comprobar_codigo = async (req, res) => {
  try {
    const { cod_unico_boleto } = req.body;
    await emailService.sendMailAdminNotificacion(req, res);
    const resultado = await adminServices.comprobar_codigo_s(cod_unico_boleto);
    res.status(200).json(resultado, { status:true,message: "boletos comprados: " });
  } catch (error) {
    console.error('Error al encontrar boletos:', error);
    res.status(400).json({ error: error.message });
  }
};
