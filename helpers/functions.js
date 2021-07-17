const moment = require('moment');

const getFechaActual = () => {
    moment.locale('es');
    let fecha = moment().tz('America/Argentina/Buenos_Aires').format("YYYY/MM/DD");
    const hora = moment().format('LT');
    fecha = new Date(fecha);
    const fechaActual = {
        fecha,
        hora
    }
    return fechaActual;
};

module.exports = {
    getFechaActual
};