const sequelize = require('../config/db');
//Servicios de acceso publico
//Servicio de consulta de eventos
exports.consulta_eventos_s = async () => {
  try {
    const resultado = await sequelize.query(
      'select * from consulta_eventos()', 
      {
        type: sequelize.QueryTypes.SELECT,
        timeout: 5000
      }
    );
    return resultado;
  } catch (error) {
    console.error('Error al consultar los eventos:', error);
    throw error;
  }
};
