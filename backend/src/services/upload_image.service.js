//librerias necesarias para el manejo y subida de imagenes
const multer = require('multer');
const fs = require('fs');
const path = require('path');
//definimos carpeta ddonde se guarda la imagen
const imagePath = path.join(__dirname, '../../images');

// Asegurar que la carpeta exista
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}
//Servicio que genera la subida de archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

exports.upload = multer({ storage: storage });
