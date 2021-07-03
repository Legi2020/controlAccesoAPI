const express = require('express');
const db = require('./config/configDB.js');
const router = require('./routes/index.js');
const path = require('path');
require('dotenv').config({ path: 'data.env' });
const { validarApiKey } = require('./controllers/Auth');

/** Importante sino la fecha se guarda con 1 dia menos en la BD */
const moment = require('moment-timezone');
moment.tz.setDefault('UTC-3');
moment.locale('es');

/* Configuración DB */
require('./models/Empleados');
require('./models/Ingresos');
require('./models/Egresos');
db.sync()
    .then(() => console.log('Base de datos conectada.'))
    .catch(error => console.log(error));

/* Levanta a Express */
const app = express();

/* Definición de Puerto */
const port = process.env.port || 5000;

/* Middleware a partir de aca */
app.use( express.urlencoded( {extended: true })); /* BodyParser*/
app.use(express.json());
/* Fin del middleware */

/* Defino router */
app.use('/', validarApiKey, router);

/* Arranque del Server */
app.listen(port, () => { 
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});



