const express = require('express');
const router = express.Router();
const { Application, Prospect } = require('./database');
const { Client, Assessor } = require('./database');

router.post('/clients/references', async (req, res, next) => {
    
    const { client, application, reference } = req.body
    
    try { 
        await Client.create(client)
        await Application.create(application)
        await Reference.create(reference)
        return res.status(201).json({employee: empleadoAsesor})
    } catch(err) {
        next(err);
    }
})

module.exports = router