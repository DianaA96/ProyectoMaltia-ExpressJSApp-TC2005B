// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const { Sequelize } = require('sequelize');
const router = express.Router();
const { Prospect, Assessor, Client } = require('./database');
const { Contact } = require('./database');
const { Op } = require("sequelize");

// Endpoint para mostrar los datos de un prospecto en el modal de contactos
router.get('/:idProspecto/contacts', async(req, res, next) => {
    
        try {
            const { idProspecto } = req.params;

            const prospecto = await Prospect.findAll({
                attributes:
                    ['apellidoPaterno', 'apellidoMaterno', 'nombre', 'numTelefono'],
                where: {
                    idProspect: idProspecto
                }
            });

            console.log(prospecto)

            const contacto = await Contact.findAll({
                attributes:
                    ['compromiso', 'createdAt'],
                where: {
                    idProspect: idProspecto
                }
            })
            
            if(prospecto) {
                return res.status(200).json({
                    prospect: prospecto[0],
                    datosContactos: {...contacto}
                })
            } else {
                return res.status(404).json({ 
                    name: "Not Found", 
                    message: "El prospecto que buscas no existe :("
                })
            }
        } catch (err) {
            next(err);
        }
    }
)

// Endpoint para mostrar los datos de un prospecto antes de editar
router.get('/:idProspect', (req, res, next) => {
    const { idProspect } = req.params;

    Prospect.findByPk(idProspect)
    .then ((prospecto) => {
            if(prospecto) {
                const { idProspect, nombre, apellidoPaterno, apellidoMaterno, correoElectronico, numTelefono } = prospecto;
                const datosProspecto = { idProspect, nombre, apellidoPaterno, apellidoMaterno, correoElectronico, numTelefono }
                return res.status(200).json({datosProspecto})
            } else {
                return res.status(404).json({
                    name: "Not Found",
                    message: "El prospecto que buscas no existe :("
                })
            }
        }) 
    .catch (
        (err) => next(err)
        )
    }
)

// Endpoint que actualiza la información del prospecto
router.patch('/:idProspect', async(req, res, next) => {
    const { idProspect } = req.params

    // Convertimos a entero el idProspect que llega desde params
    const parsedIdProspect = parseInt(idProspect)
    let prospecto = await Prospect.findByPk(parsedIdProspect)
    
    try {
        if(prospecto) {
            const { nombre, apellidoPaterno, apellidoMaterno, correoElectronico} = req.body.body
            // Convertimos a string el número de teléfono que llegará en el body
            const numTelefono = [req.body.body.numTelefono].toString()

            await prospecto.update({
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                numTelefono,
                correoElectronico
            })
            return res.status(200).json({
                prospectoActualizado: {
                    nombre,
                    apellidoPaterno,
                    apellidoMaterno,
                    numTelefono,
                    correoElectronico
                }
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "El prospecto que intentas modificar no existe :("
            })
        }
    } catch(err) {
        next(err);
        }
    }
)


// Endpoint para insertar prospectos nuevos en la vista de añadir prospecto
router.post('/', async (req, res, next) => {
    console.log(req.body.body)
    const { prospectBack } = req.body.body

    try {
        let nuevoProspecto = await Prospect.create(prospectBack)
        return res.status(201).json({nuevoProspecto})
    } catch(err) {
        next(err);
        }
    }
)

//Endpoint que listará todos los prospectos asociados a un asesor
router.get('/', async (req, res, next) => {

    const { thisAssessor: idAssessor } = req.query

    try {
        if(req.query.name){
            let prospectos = await Prospect.findAll({attributes:
                ['idProspect', 'nombre', 'apellidoPaterno', 'apellidoMaterno'],
                where: {
                    [Op.and]: [
                           { idAssessor },
                           { [Op.or]: [
                               { 'nombre': { [Op.like]: '%' + req.query.name + '%' } },
                               { 'apellidoPaterno': { [Op.like]: '%' + req.query.name + '%' } }
                             ]}
                         ]
                    // WHERE idAssessor = 1 AND (nombre LIKE %Diana% OR apellidoPaterno LIKE %Diana%))
                },
                order: [['createdAt', 'DESC']] 
               }) 

            const [ prospectosAsesor ] = prospectos
            if(prospectosAsesor) {
                return res.status(200).json({prospectos})
            } else {
                return res.status(404).json({
                    name: "Not Found",
                    message: "Lo sentimos, el asesor aún no tiene prospectos :("
                })
            }
        }
        else{
            let prospectos = await Prospect.findAll({attributes:
                ['idProspect', 'nombre', 'apellidoPaterno', 'apellidoMaterno'],
                where: {idAssessor},
                order: [['createdAt', 'DESC']] 
               })
            
            const [ prospectosAsesor ] = prospectos
            if(prospectosAsesor) {
                return res.status(200).json({prospectos})
            } else {
                return res.status(404).json({
                    name: "Not Found",
                    message: "Lo sentimos, el asesor aún no tiene prospectos :("
                })
            }
        }
        
    } catch (error) {
        next(error)
    }
    
    }
)

// Se exporta el router
module.exports = router