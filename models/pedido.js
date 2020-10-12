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
        default: 0
    },
    precio_u: {
        type: String,
        default: 0
    },
    costo_envio: {
        type: String,
        default: 0
    },
    obs_envio: {
        type: String,
    },
    monto_total: {
        type: String,
        default: 0
    },
    estado: {
        type: String,
        default: 'PENDIENTE'
    },
    cliente: {
        type: Schemma.Types.ObjectId,
        ref: 'Cliente'
      }
});


module.exports = mongoose.model( 'Pedido', userSchema );

