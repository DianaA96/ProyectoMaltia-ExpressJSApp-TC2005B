// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const router = express.Router();
const { Store, Assessor } = require('./database');

// Endpoint que enlaza a un asesor con su tienda al momento de crear y editar un asesor
router.patch('/:idStore', async(req, res, next) => {
    const { idStore } = req.params
    const { idAssessor } = req.body
    let tienda = await Store.findByPk(idStore)
    let asesorAsignado = await Assessor.findByPk(idAssessor)

    try {
        if(tienda && asesorAsignado) {
            await tienda.update(req.body)
            return res.status(200).json({
                tiendaActualizada: tienda
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "La tienda que intentas modificar no existe :("
            })
        }
    } catch(err) {
        next(err);
    }
})

router.get('/allStores', (req, res, next) => {
    
    Store.findAll({
        attributes: [
            'idAssessor', 
            'idStore',
            'nombreTienda',
            'tiendaAcro'
        ]
    })
    .then((tiendas) => {
            if(tiendas) {
                return res.status(200).json({tiendas})
            } else {
                return res.status(404).json({
                    name: "Not Found",
                    message: "Oops. Algo salió mal al cargar las tiendas. No las encontramos :("
                })
            }
        }
    ) 
    .catch (
        (err) => next(err)
        )
})

// Se exporta el router
module.exports = router