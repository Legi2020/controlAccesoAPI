const express = require("express");
const router = express.Router();
const {
  login,
  verificarToken,
  verificarTokenUser
} = require("../controllers/Auth");
const {
  getEmpleadosIngresoEgreso,
} = require("../controllers/InformesController");
const {
  registrarIngreso,
  getIngresosFechaActual,
  getIngresosEmpleado,
  editarNotaIngreso,
} = require("../controllers/IngresosController");
const {
  registrarEgreso,
  getEgresosFechaActual,
  getEgresosEmpleado,
  editarNotaEgreso,
} = require("../controllers/EgresosController");
const {
  getEmpleados,
  getEmpleadoById,
} = require("../controllers/EmpleadosController");

/**Login */
router.post("/login", login);
router.post("/verificar-token", verificarTokenUser);

/**Informes */
router.get("/informe", getEmpleadosIngresoEgreso);

/**Empleados */
router.get("/empleado", getEmpleados);
router.get("/empleado/:id", getEmpleadoById);

/**Ingresos */
router.put("/ingreso/nota", editarNotaIngreso); //Nuevo
router.post("/ingreso", registrarIngreso);
router.get("/ingreso/hoy", getIngresosFechaActual);
router.post("/ingresos", verificarToken, getIngresosEmpleado);

/**Egresos */
router.put("/egreso/nota", editarNotaEgreso); //Nuevo
router.post("/egreso", registrarEgreso);
router.get("/egreso/hoy", getEgresosFechaActual);
router.post("/egresos", verificarToken, getEgresosEmpleado);

module.exports = router;
