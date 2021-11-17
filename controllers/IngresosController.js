const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const Empleados = require("../models/Empleados.js");
const Ingresos = require("../models/Ingresos.js");
const { getFechaActual } = require("../helpers/functions");
const EmpleadosController = require("./EmpleadosController");


const registrarIngreso = async (req, res) => {
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

  let ingreso = await getIngresoSinEgreso(empleadoId, fechaActual.fecha);
  if (ingreso) {
    return res.status(200).json({
      error: true,
      message: "Ya hay un ingreso registrado, sin un egreso",
    });
  }

  ingreso = await Ingresos.create({
    fecha: fechaActual.fecha,
    hora: fechaActual.hora,
    nota,
    empleadoId,
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
    error: false,
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

const getIngresosEmpleado = async (req, res) => {
  const idEmpleado = req.body.data.id;
  const fechaDesde = req.body.data.fechaDesde;
  const fechaHasta = req.body.data.fechaHasta;
  const horaIngreso = req.body.data.horaIngreso;
  let retraso = null;

  const ingresos = await getIngresosDesdeHasta(
    idEmpleado,
    fechaDesde,
    fechaHasta,
  );

  if(horaIngreso){
    retraso = await getRetrasoIngreso(
      idEmpleado,
      fechaDesde,
      fechaHasta,
      horaIngreso,
    );
  }

  return res.status(200).json({
    error: false,
    ingresos,
    retraso,
  });
};

/** Metodos */
const getIngresosDesdeHasta = async (empleadoId, fechaDesde, fechaHasta) => {
  let ingresos = await Ingresos.findAll({
    where: {
      empleadoId,
      fecha: {
        [Op.between]: [fechaDesde, fechaHasta],
      },
    },
    order: [
      ["fecha", "DESC"],
      ["hora", "DESC"],
    ],
  });
  return ingresos;
};

const getIngresoSinEgreso = async (empleadoId, fecha) => {
  let ingreso = await Ingresos.findOne({
    where: {
      empleadoId,
      fecha,
      EgresoId: null,
    },
  });
  return ingreso;
};

const getIngresos = async (fecha) => {
  let ingreso = await Ingresos.findAll({
    where: {
      fecha,
    },
  });
  return ingreso;
};

const getRetrasoIngreso = async (
  empleadoId,
  fechaDesde,
  fechaHasta,
  horaIngreso,
) => {
  const ingresos = await Ingresos.findAll({
    where: {
      empleadoId,
      fecha: {
        [Op.between]: [fechaDesde, fechaHasta],
      },
    },
    attributes: [[Sequelize.fn("min", Sequelize.col("hora")), "hora"]],
    group: ["fecha"],
  });
  let retraso = 0;
  ingresos.forEach((hora) => {
    let ingreso = new Date('1970-01-01 '+horaIngreso+':00Z');
    let ingresoRegistrado = new Date(hora.hora);
    retraso += ((ingresoRegistrado.getTime() - ingreso.getTime()) > 0) ? ingresoRegistrado.getTime() - ingreso.getTime() : 0;
  });
  retraso = Math.floor((retraso/1000/60) << 0);
  retrasoFinal = {
    tiempo: retraso,
    unidad: 'min'
  }
  return retrasoFinal;
};

const addNotaAdminIngreso = async (req, res) => {
  const { idIngreso, notaAdmin } = req.body.data;
  const ingreso = await Ingresos.findByPk(idIngreso);
  if (!ingreso) {
      return res.status(200).json({
        error: true,
        message: "No existe el ingreso",
    });
  }
  ingreso.notaAdmin = notaAdmin;
  ingreso.save();
  return res.status(200).json({
    error: false,
    message: "Nota agregada correctamente",
    ingreso,
  });
}

module.exports = {
  registrarIngreso,
  getIngresosFechaActual,
  getIngresoEmpleadoFechaActual,
  getIngresoSinEgreso,
  getIngresos,
  getIngresosEmpleado,
  addNotaAdminIngreso
};
