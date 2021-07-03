const Sequelize = require("sequelize");
const db = require("../config/configDB.js");

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
  },
});

module.exports = Empleados;
