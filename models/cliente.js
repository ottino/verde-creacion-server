
const mongoose = require('mongoose');

let Schemma = mongoose.Schema;

let userSchema = new Schemma({
    nombre: {
        type: String,
    },
    apellido: {
        type: String,
    },
    direccion: {
        type: String,
    },
    ciudad: {
        type: String,
    },
    departamento: {
        type: String,
    },
    cod_postal: {
        type: String,
    },
    email: {
        type: String,
    },
    celular: {
        type: String,
        unique:true,
        required: [true, 'El celuar es obligatorio']
    },
});


module.exports = mongoose.model( 'Cliente', userSchema );

