
const Empleados = require('../models/Empleados.js');

const getEmpleados = async(req, res) => {
    const empleados = await Empleados.findAll();
    return res.status(200).json({
        error:false,
        empleados
    });
};

/** Metodos */
const getEmpleado = async(id) => {
    const empleado = await Empleados.findOne({
        where: {
          id,
        },
      });
      return empleado;
}

module.exports = {
    getEmpleados,
    getEmpleado
}