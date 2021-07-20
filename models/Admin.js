const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');
const db = require("../config/configDB.js");

const Admin = db.define("admin", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
},
  {
    hooks: {
        beforeCreate(usuario) {
          usuario.password = bcrypt.hashSync(
            usuario.password,
            bcrypt.genSaltSync(10),
          );
        },
      },
  }
);

module.exports = Admin;
