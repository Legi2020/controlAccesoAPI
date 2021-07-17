const express = require("express");
const router = express.Router();
const {
  getEmpleadosIngresoEgreso
} = require("../controllers/InformesController.js");
const {
  registrarIngreso,
  getIngresosFechaActual
} = require("../controllers/IngresosController");
const {
  registrarEgreso,
  getEgresosFechaActual
} = require("../controllers/EgresosController");
const { getEmpleados } = require("../controllers/EmpleadosController");

/**Informes */
router.get("/informe", getEmpleadosIngresoEgreso);


/**Empleados */
router.get("/empleado", getEmpleados);

/**Ingresos */
router.post("/ingreso", registrarIngreso);
router.get("/ingreso/hoy", getIngresosFechaActual);


/**Egresos */
router.post("/egreso", registrarEgreso);
router.get("/egreso/hoy", getEgresosFechaActual);

module.exports = router;
