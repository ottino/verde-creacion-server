const express = require('express');
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const Cliente = require('../models/cliente');
const Pedido  = require('../models/pedido');
const cliente = require('../models/cliente');

// middlewares propios
//const { verificarToken } = require('../middlewares/autenticacion');

const app     = express();

app.post('/cliente', (req, res) => {

    let body = req.body; // pasa por el bodyParser

    let cliente = new Cliente({
        nombre      : body.nombre,
        apellido    : body.apellido,
        direccion   : body.direccion,
        ciudad      : body.ciudad,
        departamento: body.departamento,
        cod_postal  : body.cod_postal,
        email       : body.email,
        celular     : body.celular,
        email       : body.email
    });

    cliente.save( (err, clienteDB) => {

        if( err ) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok:true,
            user: clienteDB
        });
    });

});

app.get('/cliente', (req, res)=>{

    Cliente.find({ /*estado: true*/ }, 'email celular nombre')
        .exec( (err, links) => {

            if ( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok:true,
                links
            });

        });

});

app.post('/pedido', (req, res) => {

    let body = req.body; // pasa por el bodyParser

    Cliente.findOne({ celular: body.celular })
                .then((resp) => {

                    let pedido = new Pedido({
                        celular       : body.celular,
                        nickname      : body.nickname,
                        productos     : body.productos,
                        fecha_pactada : body.fecha_pactada,
                        envio         : body.envio,
                        cantidad      : body.cantidad,
                        precio_u      : body.precio_u,
                        costo_envio   : body.costo_envio,
                        monto_total   : body.monto_total,
                        cliente       : resp._id
                    });

                    pedido.save( (err, pedidoDB) => {

                        if( err ) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }

                        res.json({
                            ok:true,
                            user: pedidoDB
                        });
                    });

    });




});

app.get('/pedido', (req, res)=>{

    Pedido.find({})
        .populate('cliente', 'nomnre email')
        .exec((err, pedidoDB) => {

            if ( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok:true,
                pedidoDB
            });


        });

});

module.exports = app;