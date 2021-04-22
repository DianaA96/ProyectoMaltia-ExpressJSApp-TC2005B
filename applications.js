// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const router = express.Router();
const { Application, Prospect } = require('./database');
const { Client, Assessor } = require('./database');
const { Refer } = require('./database');

// Endpoint que creará las instancias de la base de datos asociadas a la construcción de la solicitud
router.post('/clients/references', async (req, res, next) => {
    
    const { client, application, reference1, reference2, reference3 } = req.body
    const { idProspect, idAssessor } = client
    const applicant = await Prospect.findByPk(idProspect)
    const associatedEmployee = await Assessor.findByPk(idAssessor)
    
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
        }
    }   catch(err) {
            next(err);
        }   
    }
)

// Endpoint que actualizará los datos de una solicitud 
router.patch('/:idApplication', async(req, res, next) => {
    const { idApplication } = req.params
    let solicitud = await Application.findByPk(idApplication)

    try {
        if(solicitud) {
            await solicitud.update(req.body)
            return res.status(200).json({
                solicitudActualizada: req.body
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

// Se exporta el router
module.exports = router