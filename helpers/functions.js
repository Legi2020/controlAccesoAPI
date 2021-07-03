const moment = require('moment');

const getFechaActual = () => {
    moment.locale('es');
    const fecha = moment().tz('America/Argentina/Buenos_Aires').format("YYYY/MM/DD");
    const hora = moment().format('LT');
    const fechaActual = {
        fecha: new Date(fecha),
        hora
    }
    return fechaActual;
};

module.exports = {
    getFechaActual
}