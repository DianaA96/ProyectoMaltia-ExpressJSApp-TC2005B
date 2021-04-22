// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const router = express.Router();
const { Prospect, Assessor } = require('./database');
const { Contact } = require('./database');

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
                    ['compromiso'],
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

//Endpoint que listará todos los prospectos asociados a un asesor
router.get('/', (req, res, next) => {

    const { thisAssessor: idAssessor } = req.query

    Prospect.findAll({attributes:
     ['idProspect', 'nombre', 'apellidoPaterno', 'apellidoMaterno'],
     where: {
         idAssessor
     } 
    }) 
    .then ((prospectos) => {
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
    ) 
    .catch (
        (err) => next(err)
        )
    }
)

// Endpoint para insertar prospectos nuevos en la vista de añadir prospecto
router.post('/', async (req, res, next) => {
    
    const { prospect } = req.body

    try {
        await Prospect.create(prospect)
        return res.status(201).json({prospect})
    } catch(err) {
        next(err);
        }
    }
)

// Endpoint que actualiza la información del prospecto
router.patch('/:idProspect', async(req, res, next) => {
    const { idProspect } = req.params
    let prospecto = await Prospect.findByPk(idProspect)

    try {
        if(prospecto) {
            await prospecto.update(req.body)
            return res.status(200).json({
                prospectoActualizado: req.body
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

// Se exporta el router
module.exports = router