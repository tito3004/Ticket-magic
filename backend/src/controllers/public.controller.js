// Controlador público: consulta eventos disponibles
const publicService = require('../services/public.service');

// Controlador: Consultar eventos públicos
exports.consulta_eventos = async (req, res) => {
  try {
    const eventos = await publicService.consulta_eventos_s();
    res.status(200).json({ status: true, value: eventos, message: "eventos obtenidos" });
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(400).json({ error: error.message });
  }
};
