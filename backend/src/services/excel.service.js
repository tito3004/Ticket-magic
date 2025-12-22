//libreria para manejar y generar excels
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
//Servicio para manejo de excel
//Servicio:generacion de excel
exports.generar_excel = async (data, baseFilename = "reporte") => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Los datos para generar el Excel están vacíos o no son válidos.");
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Datos");

  // Encabezados
  const columnas = Object.keys(data[0]).map(key => ({
    header: key,
    key: key,
    width: Math.max(15, key.length + 5)
  }));

  worksheet.columns = columnas;

  // Estilo para encabezados
  worksheet.getRow(1).eachCell(cell => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD0E6FF" }
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
  });

  // Insertar datos
  data.forEach(row => {
    const fila = worksheet.addRow(row);
    fila.eachCell(cell => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
  });

  worksheet.columns.forEach(column => {
  let maxLength = column.header.length;

  column.eachCell({ includeEmpty: true }, cell => {
    const value = cell.value ? cell.value.toString() : "";
    maxLength = Math.max(maxLength, value.length);
  });

  column.width = maxLength + 2; // pequeño margen adicional
});

  // Crear carpeta si no existe
  const rutaCarpeta = "./reportes";
  if (!fs.existsSync(rutaCarpeta)) {
    fs.mkdirSync(rutaCarpeta);
  }

  // Agregar timestamp al nombre del archivo
  const timestamp = Date.now();
  const archivoExcel = path.join(rutaCarpeta, `${baseFilename}_${timestamp}.xlsx`);

  await workbook.xlsx.writeFile(archivoExcel);
  console.log(`Archivo generado: ${archivoExcel}`);

  return archivoExcel;
};


