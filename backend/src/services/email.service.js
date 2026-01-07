//Libreria para envio de correos
const nodemailer = require('nodemailer');
//Servicio para envio de correos
//configuracion del correo
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  tls: {
    rejectUnauthorized: false, 
  },
});
//Servicio: enviar correos
exports.sendMail = async (to, subject, htmlContent, attachmentPath = null) => {
  const mailOptions = {
    from: `"Ticketmagic" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent
  };

  // Si se proporciona un archivo, lo añadimos como adjunto
  if (attachmentPath) {
    mailOptions.attachments = [
      {
        filename: attachmentPath.split("/").pop(), // nombre del archivo desde la ruta
        path: attachmentPath
      }
    ];
  }

  return transporter.sendMail(mailOptions);

};
//Servicio: enviar correos de notificacion de acceso indebidos al administrador
exports.sendMailAdminNotificacion = async (req, res) => {
  try {
    if (req.rol !== 'admin') {
      await emailService.sendMail(
        process.env.EMAIL_USER,
        'Intento de funcionalidades de usuario',
        `<h1>Hola administrador!, el usuario ${req.nombre} con el correo ${req.correo} ha intentado usar funcionalidades de administrador</h1><br><p>
          Ponte en contacto con el darle un aviso de que si no deja de intentar quebrantar la seguridad de sistema sera <b>eliminado</b> de este mismo</p>`
      );
    }
  } catch (error) {
    console.error('Error en enviar correo:', error);
  }
};
