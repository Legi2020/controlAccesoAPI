
const Empleados = require('../models/Empleados.js');
const Egresos = require('../models/Egresos.js');
const { getFechaActual } = require('../helpers/functions');
const EmpleadosController = require('./EmpleadosController');
const IngresosController = require('./IngresosController');


const registrarEgreso = async (req, res) => {
    const fechaActual =  getFechaActual();
    const idEmpleado = req.body.idEmpleado;

    const empleado = await EmpleadosController.getEmpleado(idEmpleado);
    if(!empleado){
      return res.status(400).json({
        error: true,
        message: 'No existe el empleado'
      });
    };

    const ingreso = await IngresosController.getIngreso(idEmpleado, fechaActual.fecha);
    if(!ingreso){
        return res.status(400).json({
             error: true,
             message: "No se registro un ingreso"
         });
     };
 
    let egreso = await getEgreso(idEmpleado, fechaActual.fecha);
    if(egreso){
        return res.status(400).json({
            error: true,
            message: 'Ya hay un egreso registrado',
        });
    };
    
    egreso = await Egresos.create({
        fecha: fechaActual.fecha,
        hora: fechaActual.hora,
        EmpleadoId: req.body.idEmpleado
    });
     
    return res.status(200).json({
        error: false,
        message: 'egreso registrado',
        egreso
    });
};

const getEgresosFechaActual = async (req, res) => {
    const fechaActual = getFechaActual();
    const egresos = await getEgresos(fechaActual.fecha);
    return res.status(200).json({
        error:false,
        egresos
    });
};

const getEgresoEmpleadoFechaActual = async(req, res) => {
    const idEmpleado = req.params.id;
    const fechaActual = getFechaActual();
    const egreso = await getEgreso(idEmpleado, fechaActual.fecha);
    return res.status(200).json({
        error: false,
        egreso
    });
};

/** Metodos */
const getEgreso = async(EmpleadoId, fecha) => {
    let egreso = await Egresos.findOne({
        where: {
            EmpleadoId,
            fecha
        }
    });
    return egreso;
};

const getEgresos = async(fecha) => {
    let egresos = await Egresos.findAll({
        where: {
            fecha
        }
    });
    return egresos;
};

module.exports = {
    registrarEgreso,
    getEgresosFechaActual,
    getEgresoEmpleadoFechaActual,
    getEgreso,
    getEgresos
}