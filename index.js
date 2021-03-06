const express = require("express");
const db = require("./config/configDB.js");
const router = require("./routes/index.js");
const cors = require("cors");
require("dotenv").config({ path: "data.env" });

/** Importante sino la fecha se guarda con 1 dia menos en la BD */
const moment = require('moment-timezone');
moment.locale('es');
moment.tz.setDefault('UTC-3');

/* Configuración DB */
require("./models/Empleados");
require("./models/Ingresos");
require("./models/Egresos");
db.sync()
  .then(() => console.log("Base de datos conectada."))
  .catch((error) => console.log(error));

const configCors = {
  application: {
    cors: {
      server: [
        {
          origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
          credentials: true,
        },
      ],
    },
  },
};
/* Levanta a Express */
const app = express();

// CORS
app.use(cors(configCors.application.cors.server));

/* Definición de Puerto */
const port = process.env.port || process.env.PORT_APP;

/* Middleware a partir de aca */
app.use(express.urlencoded({ extended: true })); /* BodyParser*/
app.use(express.json());
/* Fin del middleware */

/* Defino router */
app.use("/", router);
//validarApiKey
/* Arranque del Server */
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
