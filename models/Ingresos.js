const Sequelize = require('sequelize');
const db = require('../config/configDB.js');
const Empleados = require('../models/Empleados');
const Egresos = require('../models/Egresos');

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
    },
    nota: {
        type: Sequelize.TEXT
    },
    url: {
        type: Sequelize.STRING(100)
    }
});

//Ingresos.belongsTo(Empleados, { as: 'Empleado' });
Ingresos.belongsTo(Egresos, { as: 'Egreso', allowNull: true });

module.exports = Ingresos;