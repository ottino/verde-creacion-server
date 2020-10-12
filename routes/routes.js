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

app.put('/pedido', (req, res) => {

    let id   = req.body.id;

    if ( id )
    {

        Pedido.findById(id , (err, pedidoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!pedidoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No existe el pedido'
                    }
                });
            }

            Cliente.findOne({ celular: req.body.celular })
                .then((respCliente) => {

                    if ( respCliente )
                    {

                        pedidoDB.celular       = req.body.celular,
                        pedidoDB.nickname      = req.body.nickname,
                        pedidoDB.productos     = req.body.productos,
                        pedidoDB.fecha_pactada = req.body.fecha_pactada,
                        pedidoDB.envio         = req.body.envio,
                        pedidoDB.obs_envio     = req.body.envioObs,
                        pedidoDB.cantidad      = req.body.cantidad,
                        pedidoDB.precio_u      = req.body.precio_u,
                        pedidoDB.costo_envio   = req.body.costo_envio,
                        pedidoDB.monto_total   = req.body.monto_total,
                        pedidoDB.estado        = req.body.estado,
                        pedidoDB.cliente       = respCliente._id;

                        pedidoDB.save( (err, pedidoDB) => {

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

                    } else {

                            return res.status(400).json({
                                ok: false,
                                err: {
                                    message: 'El cliente no existe'
                                }
                            });

                    }


            });

        });

    }


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
                            obs_envio     : body.envioObs,
                            cantidad      : body.cantidad,
                            precio_u      : body.precio_u,
                            costo_envio   : body.costo_envio,
                            monto_total   : body.monto_total,
                            estado        : body.estado,
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

        }).catch(e => {

            return res.status(400).json({
                ok: false,
                e
            });

        });

});

app.get('/pedido', (req, res)=>{

    let body = req.query;

    if ( body._id )
    {
        return Pedido.find({ _id: body._id })
            .populate('cliente', 'nombre email')
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

    } else {

        return Pedido.find({})
            .populate('cliente', 'nombre email')
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

    }

});

module.exports = app;