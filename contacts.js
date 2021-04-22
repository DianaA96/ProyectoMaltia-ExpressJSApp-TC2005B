// Importamos Express, el Router y los modelos necesarios para las queries
const express = require('express');
const router = express.Router();
const { Prospect, Contact } = require('./database');

// Endpoint que creará nuevas instancias de contactos asociados a un prospecto
router.post('/', async(req, res, next) => {
    
    const { idProspect, idContact, compromiso } = req.body
    const contacto = { idContact, idProspect, compromiso }

    try {
        let prospecto = await Prospect.findByPk(idProspect)
        if(prospecto) {
            await Contact.create(contacto)
            return res.status(201).json({contacto})
        } else {
            return res.status(404).json({
                name: "Not Found",
                message: "El prospecto al que haces referencia no existe :("
            })
        }
    } catch {
        next(err)
    }
})

// Se exporta el router
module.exports = router