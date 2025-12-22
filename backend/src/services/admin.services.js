//Llamamos a sequelize que nos permita hacer llamadas a las base de datis
const sequelize = require('../config/db');
//Llamamos al modelo usuario, que nos permite tener una estructura a la cual enviaremos a la base de datos
const User = require('../models/user.model');
//Servisios de usuarios
// Servicio: Agregar artista
exports.agregar_artista_s = async (nombre_artista, tipo_artista, genero) => {
  try {
    const resultado = await sequelize.query(
      'SELECT agregar_artista($1, $2, $3)',
      {
        bind: [nombre_artista, tipo_artista, genero],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error al guardar artista:', error);
    throw error;
  }
};
//Servicio: encontrar usuarios
exports.findAll = () => User.findAll(
  //excluimos el campo passsword de la consulta de todos los usuarios
  { attributes: { exclude: ['password'] } }
);
//Servicio: generar eventos
exports.generar_evento_s = async (req, res) => {
  try {
    // Esperar la ejecución de la función PostgreSQL
    const resultado = await sequelize.query(
      'SELECT generar_eventos($1, $2, $3, $4, $5, $6, $7)',
      {
        bind: [
          req.body.nombre_evento,
          req.body.tipo_evento,
          req.body.nombre_artista,
          req.body.json_fechas,
          req.body.json_horas,
          req.body.json_lugar,
          req.file.filename
        ]
        ,
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;

  } catch (error) {
    console.error('Error al guardar el evento', error);
  }
}
// Servicio: Agregar lugar
exports.agregar_lugar_s = async (req,res) => {
  try {
    const resultado = await sequelize.query(
      'SELECT agregar_lugares($1, $2, $3, $4, $5)',
      {
        bind: [req.body.nombre_lugar, req.body.capacidad, req.body.nombre_ciudad, req.body.nombre_pais, JSON.stringify(req.body.json_asientos)],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error al guardar el lugar:', error);
    throw error;
  }
};

// Servicio: Generar reporte boletos
exports.generar_reporte_boletos_s = async (req,res) => {
  try {
    const resultado = await sequelize.query(
      'SELECT * FROM consulta_boletos_admin($1)',
      {
        bind:[req.body.nombre_evento],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error al generar reporte:', error);
    throw error;
  }
};
// Servicio: cancelar eventos
exports.cancelar_eventos_s = async (nombre_evento) => {
  try {
    const resultado = await sequelize.query(
      'SELECT cancelacion_eventos($1)',
      {
        bind: [nombre_evento],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error al eliminar evento:', error);
    throw error;
  }
}
//Servicio: consultar lugares
exports.consultar_lugares_s = async () => {
  try {
    const resultado = await sequelize.query(
      'select nombre_lugar from lugar',
      {
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
//Servicio: consultar artistas
exports.consultar_artista_s = async () => {
  try {
    const resultado = await sequelize.query(
      'select nombre_artista from artista',
      {
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
// Servicio: Generar reporte boletos cancelados
exports.generar_reporte_cancelados_s = async (nombre_evento) => {
  try {
    const resultado = await sequelize.query(

      'SELECT * FROM reporte_boleto_cancelados where nombre_evento=$1',
      {
        bind: [nombre_evento],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error al generar reporte:', error);
    throw error;
  }
};

// Servicio: Generar reporte boletos cancelados
exports.comprobar_codigo_s = async (nombre_evento) => {
  try {
    const resultado = await sequelize.query(

      'SELECT obtener_boletos_por_json($1)',
      {
        bind: [cod_unico_boleto],
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error al generar reporte:', error);
    throw error;
  }
};




