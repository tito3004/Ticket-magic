//librerias necesarias para el manejo de servicios de usuarios
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const emailService = require('./email.service')
const sequelize = require('../config/db'); 
const crypto = require('crypto');
//Servicios de usuarios
//Servicios de creacion de usuario
exports.create = async (data) => {
  //creammos una clave encriptada que servira para crear usuario, determinamos campos como admin y verificado como falsos
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashedPassword, admin: false, verificado: false });
};
//servicio para restaurar clave
exports.restaurar = async ({ correo, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [updated] = await User.update(
    { password: hashedPassword },
    { where: { correo } }
  );

  return updated > 0;
};
//servicio para compra de boletos
exports.compra_boleto_s = async (cantidad, localidad, fecha, hora, evento, usuario) => {
  const cod_unico_boleto = 'TICKET-' + crypto.randomBytes(16).toString('hex');
  console.log('CÓDIGO DE BOLETO:', cod_unico_boleto);
  
  try {
    const result = await sequelize.query(
      'SELECT compra_boletos($1, $2, $3, $4, $5, $6, $7)',
      {
        bind: [cantidad, localidad, fecha, hora, evento, usuario, cod_unico_boleto],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );

    console.log('Respuesta de la función:', result); 

    return {
      total: result[0]?.compra_boletos,
      cod_unico_boleto: cod_unico_boleto
    };
  } catch (error) {
    console.error('Error al comprar boleto:', error); 
    throw error;
  }
};

//servicio para envio de formulario de incovenientes
exports.formulario_incovenientes_s = async (req) => {
  const {  nombre_inconveniente, descripcion } = req.body;
  const correo = req.correo;
  try {
    await emailService.sendMail(
      process.env.EMAIL_USER,
      `Inconveniente de: ${correo}`,
      `<b>Inconveniente ${nombre_inconveniente}:</b><br>${descripcion}`
    );
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};
//servicio para cancelacion de boleto
exports.cancelar_boleto_s = async (cod_unico_boleto) => {
  try {
    await sequelize.query(
      'SELECT eliminar_boletos_por_codigo($1)',
      {
        bind: [cod_unico_boleto],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return  cod_unico_boleto ;
  } catch (error) {
    console.error('Error al eliminar boleto:', error);
    throw error;
  }
};

//servicio para consultar boletos por codigo
exports.consultaResumenPorCodigo= async (codUnico)=> {
  return sequelize.query(
    'SELECT * FROM consulta_boletos_qr($1)',
    {
      bind: [codUnico],
      type: sequelize.QueryTypes.SELECT,
      timeout: 5000
    }
  );
};
//servicio para consultar boletos por id de usuario
exports.consultaResumenPorUsuario=async (req)=> {
  const id=req.userId
  return sequelize.query(
    'SELECT * FROM consulta_boletos_por_usuario($1)',
    {
      bind: [id],
      type: sequelize.QueryTypes.SELECT,
      timeout: 5000
    }
  );
};


//servicio par consultar boleto
exports.consultar_boleto_s = async (cod_unico_boleto) => {
  try {
    const resultado =await sequelize.query(
      'SELECT * from consulta_boletos($1)',
      {
        bind: [cod_unico_boleto],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error al eliminar boleto:', error);
    return false;
  }
};

