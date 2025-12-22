//middleware que decodifica tokens para autentificar al usuario
const jwt = require('jsonwebtoken');
//definimos la logica para que valide si el token es correcto
module.exports = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.rol = decoded.rol;
    req.nombre = decoded.nombre;
    req.correo = decoded.correo;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
