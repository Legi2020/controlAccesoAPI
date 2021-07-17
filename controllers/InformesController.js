const Empleados = require("../models/Empleados.js");
const Ingresos = require("../models/Ingresos.js");
const Egresos = require("../models/Egresos.js");
const { getFechaActual } = require("../helpers/functions");
const IngresosController = require("./IngresosController");
const EgresosController = require("./EgresosController");
const EmpleadosController = require("./EmpleadosController");

const getEmpleadosIngresoEgreso = async (req, res) => {
  const fechaActual = getFechaActual();

  const empleados = await Empleados.findAll();
  let ingresos = await IngresosController.getIngresos(
      fechaActual.fecha,
  );

  let egresos = await EgresosController.getEgresos(fechaActual.fecha);

  res.status(200).json({
    error: false,
    ingresos,
    empleados,
    egresos,
  });
};

module.exports = {
  getEmpleadosIngresoEgreso,
};
