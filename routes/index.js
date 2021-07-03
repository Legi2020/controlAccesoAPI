const express = require("express");
const router = express.Router();
const {
  getEmpleadosIngresoEgresoHoy,
} = require("../controllers/InformesController.js");
const {
  registrarIngreso,
  getIngresosFechaActual,
  getIngresoEmpleadoFechaActual,
} = require("../controllers/IngresosController");
const {
  registrarEgreso,
  getEgresosFechaActual,
  getEgresoEmpleadoFechaActual,
} = require("../controllers/EgresosController");
const { getEmpleados } = require("../controllers/EmpleadosController");

/**Informes */
router.get("/informe", getEmpleadosIngresoEgresoHoy);

/**Empleados */
router.get("/empleado", getEmpleados);

/**Ingresos */
router.post("/ingreso", registrarIngreso);
router.get("/ingreso/hoy", getIngresosFechaActual);
router.get("/ingreso/hoy/:id", getIngresoEmpleadoFechaActual);

/**Egresos */
router.post("/egreso", registrarEgreso);
router.get("/egreso/hoy", getEgresosFechaActual);
router.get("/egreso/hoy/:id", getEgresoEmpleadoFechaActual);

module.exports = router;
