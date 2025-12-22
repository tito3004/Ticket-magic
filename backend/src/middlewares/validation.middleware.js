const { validationResult } = require('express-validator');
//middleware validaciones necesarias para el manejo de rutas
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
