const express = require('express');
const router = express.Router();
const { Prospect, Assessor } = require('./database');

//Endpoint que listará todos los prospectos asociados a un asesor
router.get('/', (req, res, next) => {
    // HAY QUE REVISAR LA LÓGICA DE ESTE ENDPOINT
    const query = req.query.idAssessor = req.query.thisIdAssessor ? {idAssessor: req.query.thisIdAssessor} : {};
    Prospect.findAll({attributes:
     ['idProspect', 'nombre', 'apellidoPaterno', 'apellidoMaterno'],
     ...query
    }) .then ((allEmployees) => {
            return res.status(200).json({empleados: allEmployees})
        }) .catch (
            (err) => next(err)
        )
})

//Endpoint que devolverá la información de un prospecto que se muestra en el llenado de la solicitud
router.get('/', (req, res, next) => {
    
    const { prospectId } = req.params;

    Prospect.findByPk(prospectId) 
            .then ((prospectFound) => {
                const { idProspect, nombre, apellidoPaterno, apellidoMaterno } = prospectFound;
                const datosProspecto = { idProspect, nombre, apellidoPaterno, apellidoMaterno }
                return res.status(200).json({datosProspecto: datosProspecto})
            }) .catch (
            (err) => next(err)
        )
    })


module.exports = router