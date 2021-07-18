const express = require("express");
const router = express.Router();
const {
  getEmpleadosIngresoEgreso,
} = require("../controllers/InformesController.js");
const {
  registrarIngreso,
  getIngresosFechaActual,
  getIngresosEmpleado,
} = require("../controllers/IngresosController");
const {
  registrarEgreso,
  getEgresosFechaActual,
  getEgresosEmpleado,
} = require("../controllers/EgresosController");
const {
  getEmpleados,
  getEmpleadoById,
} = require("../controllers/EmpleadosController");

/**Informes */
router.get("/informe", getEmpleadosIngresoEgreso);

/**Empleados */
router.get("/empleado", getEmpleados);
router.get("/empleado/:id", getEmpleadoById);

/**Ingresos */
router.post("/ingreso", registrarIngreso);
router.get("/ingreso/hoy", getIngresosFechaActual);
router.post("/ingresos", getIngresosEmpleado);

/**Egresos */
router.post("/egreso", registrarEgreso);
router.get("/egreso/hoy", getEgresosFechaActual);
router.post("/egresos", getEgresosEmpleado);

module.exports = router;
