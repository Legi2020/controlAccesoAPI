const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const Egresos = require("../models/Egresos.js");
const { getFechaActual } = require("../helpers/functions");
const EmpleadosController = require("./EmpleadosController");

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

  let egreso = await Egresos.findOne({
    where: { fecha: fechaActual.fecha, hora: { [Op.is]: null }, empleadoId },
  });

  if (!egreso) {
    return res.status(200).json({
      error: true,
      message: "No se registro un ingreso",
    });
  }

  egreso.nota = nota;
  egreso.hora = fechaActual.hora;

  egreso.save();

  return res.status(200).json({
    error: false,
    message: "Egreso registrado",
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

const getEgresosEmpleado = async (req, res) => {
  const idEmpleado = req.body.data.id;
  const fechaDesde = req.body.data.fechaDesde;
  const fechaHasta = req.body.data.fechaHasta;
  const horaEgreso = req.body.data.horaEgreso;
  let tiempoExtra = null;

  const egresos = await getEgresosDesdeHasta(
    idEmpleado,
    fechaDesde,
    fechaHasta,
  );

  if (horaEgreso) {
    tiempoExtra = await getRetrasoEgreso(
      idEmpleado,
      fechaDesde,
      fechaHasta,
      horaEgreso,
    );
  }

  return res.status(200).json({
    error: false,
    egresos,
    tiempoExtra,
  });
};

/** Metodos */
const getEgresosDesdeHasta = async (empleadoId, fechaDesde, fechaHasta) => {
  let egreso = await Egresos.findAll({
    where: {
      empleadoId,
      fecha: {
        [Op.between]: [fechaDesde, fechaHasta],
      },
    },
    order: [
      ["id", "DESC"]
    ],
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

const getRetrasoEgreso = async (
  empleadoId,
  fechaDesde,
  fechaHasta,
  horaEgreso,
) => {
  const egresos = await Egresos.findAll({
    where: {
      empleadoId,
      fecha: {
        [Op.between]: [fechaDesde, fechaHasta],
      },
    },
    attributes: [[Sequelize.fn("max", Sequelize.col("hora")), "hora"]],
    group: ["fecha"],
  });

  let retraso = 0;
  egresos.forEach((hora) => {
    let egreso = new Date("1970-01-01 " + horaEgreso + ":00Z");
    let egresoRegistrado = new Date(hora.hora);
    retraso +=
      egresoRegistrado.getTime() - egreso.getTime() > 0
        ? egresoRegistrado.getTime() - egreso.getTime()
        : 0;
  });
  retraso = Math.floor((retraso / 1000 / 60) << 0);
  retrasoFinal = {
    tiempo: retraso,
    unidad: "min",
  };
  return retrasoFinal;
};

const addNotaAdminEgreso = async (req, res) => {
  const { idEgreso, notaAdmin } = req.body.data;
  const egreso = await Egresos.findByPk(idEgreso);
  if (!egreso) {
    return res.status(200).json({
      error: true,
      message: "No existe el egreso",
    });
  }
  egreso.notaAdmin = notaAdmin;
  egreso.save();
  return res.status(200).json({
    error: false,
    message: "Nota agregada correctamente",
    egreso,
  });
};

module.exports = {
  registrarEgreso,
  getEgresosFechaActual,
  getEgresosEmpleado,
  getEgresos,
  addNotaAdminEgreso,
};
