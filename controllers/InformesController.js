const Empleados = require('../models/Empleados.js');
const Ingresos = require('../models/Ingresos.js');
const Egresos = require('../models/Egresos.js');
const { getFechaActual } = require('../helpers/functions');
const IngresosController = require('./IngresosController');
const EgresosController = require('./EgresosController');

const getEmpleadosIngresoEgresoHoy = async(req, res) => {
    const fechaActual = getFechaActual();
    const ingresos = await IngresosController.getIngresos(fechaActual.fecha);
    const egresos = await EgresosController.getEgresos(fechaActual.fecha);

    return res.status(200).json({
        error: false,
        ingresos,
        egresos
    })
};

module.exports = {
    getEmpleadosIngresoEgresoHoy
}