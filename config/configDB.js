const Sequelize = require('sequelize');
require('dotenv').config({ path: 'data.env' });

const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mssql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    },
    operatorAliases: false,
    logging: false,
    freezeTableName: true
});

module.exports = db;