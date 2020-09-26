const mongoose = require('mongoose');

let Schemma = mongoose.Schema;

let userSchema = new Schemma({
    celular: {
        type: String,
        required: [true, 'El celuar es obligatorio'],
    },
    nickname: {
        type: String,
    },
    productos: {
        type: String,
    },
    fecha_pactada: {
        type: String,
    },
    envio: {
        type: Boolean,
        default: false
    },
    cantidad: {
        type: String,
    },
    precio_u: {
        type: String,
    },
    costo_envio: {
        type: String,
        default: 0
    },
    monto_total: {
        type: String,
    },
    estado: {
        type: String,
        default: 'PENDIENTE'
    }
});


module.exports = mongoose.model( 'Pedido', userSchema );

