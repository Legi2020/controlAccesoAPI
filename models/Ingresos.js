const Sequelize = require('sequelize');
const db = require('../config/configDB.js');
const Empleados = require('../models/Empleados');

const Ingresos = db.define('ingresos',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.DATE
    },
    hora : {
        type: Sequelize.TIME
    }
});
Ingresos.belongsTo(Empleados, { as: 'Empleado' });

module.exports = Ingresos;