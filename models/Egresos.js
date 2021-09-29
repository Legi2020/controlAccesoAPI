const Sequelize = require('sequelize');
const db = require('../config/configDB.js');
const Empleados = require('../models/Empleados');

const Egresos = db.define('egresos',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: Sequelize.DATEONLY
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
//Egresos.belongsTo(Empleados, { as: 'Empleado' });

module.exports = Egresos;