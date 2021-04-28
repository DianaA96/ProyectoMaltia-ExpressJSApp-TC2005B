// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const router = express.Router();
const { Application, Prospect } = require('./database');
const { Client, Assessor } = require('./database');
const { Refer } = require('./database');

// Endpoint que creará las instancias de la base de datos asociadas a la construcción de la solicitud
router.post('/clients/references', async (req, res, next) => {
    console.log(req.body.body)
    const { client, application, reference1, reference2, reference3 } = req.body.body
    const { idClient, idAssessor } = application
    const applicant = await Prospect.findByPk(idClient)
    const associatedEmployee = await Assessor.findAll({where:{idAssessor: idAssessor}})
    
    try { 
        if(applicant && associatedEmployee) {
            await Client.create(client)
            await Application.create(application)
            await Refer.create(reference1)
            await Refer.create(reference2)
            await Refer.create(reference3)
            return res.status(201).json({
                client,
                application,
                reference1,
                reference2,
                reference3
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "No existen prospectos y asesores asociados :("
            })
        }
    }   catch(err) {
            next(err);
        }   
    }
)

// Endpoint que actualizará los datos de una solicitud 
router.patch('/:idApplication', async(req, res, next) => {
    const { idApplication } = req.params

    

    try {
        let solicitud = await Application.findByPk(idApplication)
        //console.log(req.body);
        if(solicitud) {
            await solicitud.update(req.body.body)
            console.log(solicitud);
            return res.status(200).json({
                solicitudActualizada: solicitud
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "La solicitud que intentas modificar no existe :("
            })
        }
    } catch(err) {
        next(err);
    }
})

router.patch('/clients/references/:idClient', async(req, res, next) => {
    const { idClient } = req.params
    console.log(req.body.body)
    try {//Actualiza client, application y ref
        let solicitud = await Application.findOne({
            where:{
                idClient: idClient
            }
        })
        
        let cliente = await Client.findOne({
            where:{
                idClient: idClient
            }
        })

        let referencia1 = await Refer.findOne({
            where:{
                idClient: idClient,
                refName: req.body.body.refViejitas[0].refName
            }
        })
        let referencia2 = await Refer.findOne({
            where:{
                idClient: idClient,
                refName: req.body.body.refViejitas[1].refName
            }
        })
        let referencia3 = await Refer.findOne({
            where:{
                idClient: idClient,
                refName: req.body.body.refViejitas[2].refName
            }
        })

        console.log(solicitud);
        console.log(cliente);
        console.log(referencia1);
        console.log(referencia2);
        console.log(referencia3);

        if(solicitud && cliente && referencia1 && referencia2 && referencia3) {
            await solicitud.update(req.body.body.application)
            await cliente.update(req.body.body.client)
            await referencia1.update(req.body.body.reference1)
            await referencia2.update(req.body.body.reference2)
            await referencia3.update(req.body.body.reference3)
            return res.status(200).json({
                solicitudActualizada: solicitud,
                clienteActualizado: cliente,
                referenciasActualizadas: {
                    referencia1,
                    referencia2,
                    referencia3
                }
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "La solicitud, referencias y cliente que intentas modificar no existen :("
            })
        }
    } catch(err) {
        next(err);
    }
})

// Se exporta el router
module.exports = router