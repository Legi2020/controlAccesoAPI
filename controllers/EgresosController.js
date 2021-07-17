const Empleados = require("../models/Empleados.js");
const Egresos = require("../models/Egresos.js");
const { getFechaActual } = require("../helpers/functions");
const EmpleadosController = require("./EmpleadosController");
const IngresosController = require("./IngresosController");

const registrarEgreso = async (req, res) => {
  const fechaActual = getFechaActual();
  const empleadoId = req.body.data.idEmpleado;
  const nota = req.body.data.nota;
  const empleado = await EmpleadosController.getEmpleado(empleadoId);
  
  if (!empleado) {
    return res.status(400).json({
      error: true,
      message: "No existe el empleado",
    });
  }

  const ingreso = await IngresosController.getIngresoSinEgreso(
    empleadoId,
    fechaActual.fecha,
  );
  if (!ingreso) {
    return res.status(200).json({
      error: true,
      message: "No se registro un ingreso",
    });
  }

  egreso = await Egresos.create({
    fecha: fechaActual.fecha,
    hora: fechaActual.hora,
    nota,
    empleadoId,
  });

  ingreso.EgresoId = egreso.id;
  ingreso.save();

  return res.status(200).json({
    error: false,
    message: "egreso registrado",
    egreso,
  });
};

const getEgresosFechaActual = async (req, res) => {
  const fechaActual = getFechaActual();
  const egresos = await getEgresos(fechaActual.fecha);
  return res.status(200).json({
    error: false,
    egresos,
  });
};

const getEgresoEmpleado = async (req, res) => {
  const idEmpleado = req.params.id;
  const fechaActual = getFechaActual();
  const egreso = await getEgreso(idEmpleado, fechaActual.fecha);
  return res.status(200).json({
    error: false,
    egreso,
  });
};

/** Metodos */
const getEgreso = async (empleadoId, fecha) => {
  let egreso = await Egresos.findOne({
    where: {
      empleadoId,
      fecha,
    },
  });
  return egreso;
};

const getEgresos = async (fecha) => {
  let egreso = await Egresos.findAll({
    where: {
      fecha,
    },
  });
  return egreso;
};

module.exports = {
  registrarEgreso,
  getEgresosFechaActual,
  getEgresoEmpleado,
  getEgresos
};
