// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const router = express.Router();
const {Sequelize} = require('sequelize');
const { Store, Assessor } = require('./database');

// Endpoint que enlaza a un asesor con su tienda al momento de crear y editar un asesor
router.patch('/:idStore', async (req, res, next) => {
    const { idStore } = req.params
    const numberIdStore = parseInt(idStore);
    const { idAssessor } = req.body.data
    console.log(numberIdStore, idAssessor)
    let tienda = await Store.findByPk(numberIdStore)
    let asesorAsignado = await Assessor.findByPk(idAssessor)
    try {
        console.log(asesorAsignado)
        if(tienda && asesorAsignado) {
            await tienda.update(req.body.data,)
            return res.status(200).json({
                tiendaActualizada: tienda
            })
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "La tienda que intentas modificar no existe :(",
                body: req.body.data
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