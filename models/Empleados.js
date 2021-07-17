const Sequelize = require("sequelize");
const db = require("../config/configDB.js");
const Ingresos = require('../models/Ingresos');
const Egresos = require('../models/Egresos');


const Empleados = db.define("empleados", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  apellido: {
    type: Sequelize.STRING,
  }
});

Empleados.hasMany(Ingresos);
Empleados.hasMany(Egresos);

module.exports = Empleados;
