const Empleados = require("../models/Empleados.js");
const Ingresos = require("../models/Ingresos.js");
const { getFechaActual } = require("../helpers/functions");
const EmpleadosController = require('./EmpleadosController');

const registrarIngreso = async (req, res) => {
  const fechaActual = getFechaActual();
  const idEmpleado = req.body.idEmpleado;

  const empleado = await EmpleadosController.getEmpleado(idEmpleado);
  if(!empleado){
    return res.status(400).json({
      error: true,
      message: 'No existe el empleado'
    })
  };

  let ingreso = await getIngreso(idEmpleado, fechaActual.fecha);
  if (ingreso) {
    return res.status(400).json({
      error: true,
      message: "Ya hay un ingreso registrado",
    });
  };

  ingreso = await Ingresos.create({
    fecha: fechaActual.fecha,
    hora: fechaActual.hora,
    EmpleadoId: req.body.idEmpleado,
  });

  return res.status(200).json({
    error: false,
    message: "Ingreso registrado",
    ingreso,
  });
};

const getIngresosFechaActual = async (req, res) => {
  const fechaActual = getFechaActual();
  const ingresos = await Ingresos.findAll({
    where: {
      fecha: fechaActual.fecha,
    },
  });
  return res.json({
    error:false,
    ingresos,
  });
};

const getIngresoEmpleadoFechaActual = async (req, res) => {
  const idEmpleado = req.params.id;
  const fechaActual = getFechaActual();
  const ingreso = await getIngreso(idEmpleado, fechaActual.fecha);

  return res.status(200).json({
    error: false,
    ingreso,
  });
};

/** Metodos  */
const getIngreso = async(EmpleadoId, fecha) => {
  let ingreso = await Ingresos.findOne({
    where: {
        EmpleadoId,
        fecha
    }
  });
  return ingreso;
};

const getIngresos = async(fecha) => {
  let ingreso = await Ingresos.findAll({
    where: {
        fecha
    }
  });
  return ingreso;
};

module.exports = {
  registrarIngreso,
  getIngresosFechaActual,
  getIngresoEmpleadoFechaActual,
  getIngreso,
  getIngresos
};
