// Se importan las librerías necesarias
const express = require('express');
const { QueryTypes } = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Se importan los archivos de Router
const employees = require('./employees')
const prospects = require('./prospects')
const applications = require('./applications')
const contacts = require('./contacts')
const stores = require('./stores')

// Destructuramos los modelos requeridos en las consultas que incluyen raw queries de SQL
const { DB, Refer }  = require('./database')

// Se añade el bodyParser para poder asegurar la comunicación servidor/cliente
app.use(bodyParser.json());

// Para evitar el horroroso error de CORS
app.use(cors());

// ----------------------------------------------------------------------------------
// Endpoints que contienen queries de SQL

// Endpoint que obtiene los ids, nombres y estatus de las solicitudes de los clientes
app.get('/clients/applications', (req, res, next) => {
   
    // Raw SQL Query
    DB.query(
        `SELECT 
        [prospects].[idProspect], 
        [prospects].[nombre], 
        [prospects].[apellidoPaterno], 
        [prospects].[apellidoMaterno], 
        [applications].[idApplication]
        FROM [prospects] JOIN [applications] 
        ON [idProspect] = [idClient]
        WHERE [prospects].[deletedAt] IS NULL AND [applications].[deletedAt] IS NULL`,
        { type: QueryTypes.SELECT })
        .then((datosProspecto) => {
            return res.status(200).json({
                datosProspecto
            })
        }) 
        .catch ((err) => {
            next(err);
        })
    }
)

// Endpoint que recupera el nombre completo y el id de todos los prospectos que también son clientes
app.get('/prospects/clients', (req, res, next) => {

    const { thisEmployee: idEmployee } = req.query

    // Raw SQL Query
    DB.query(
        `SELECT 
        [idProspect], 
        [nombre],
        [apellidoPaterno],
        [apellidoMaterno],
        [idApplication],
        [estatus]
        FROM [clients] JOIN [applications] ON [applications].[idClient] = [clients].[idClient]
        JOIN [prospects] ON [prospects].[idProspect] = [clients].[idClient]
        WHERE [applications].[idAssessor]= ${idEmployee} OR [applications].[idAnalyst] = ${idEmployee}
        AND [prospects].[deletedAt] IS NULL 
        AND [applications].[deletedAt] IS NULL 
        AND [clients].[deletedAt] IS NULL`,
        { type: QueryTypes.SELECT })
        .then((queryResult) => {
            return res.status(200).json({
                solicitudes: queryResult
            })
        }
        )
        .catch ((err) => {
            next(err);
        })
    }
)

// Este endpoint recuperará la información completa que se mostrará en la solicitud del cliente
app.get('/applications/full-application-data/:idProspecto', async(req, res, next) => {
    
    const { idProspecto } = req.params

    try {
        let info1 = await DB.query(
            `SELECT
            [idProspect] AS [idClient],
            [idApplication],
            [creditoSolicitado],
            [applications].[idAssessor],
            [nombre],
            [apellidoPaterno],
            [apellidoMaterno],
            [antiguedadZorro],
            [capacidadZorro],
            [altaIsi],
            [auditoriaBuro],
            [creditoAutorizado],
            [montoAutorizado],
            [montoDispuesto],
            [numTelefono],
            [correoElectronico],
            [numClienteZorro],
            [fechaNacimiento],
            [direccion],
            [numIne],
                (SELECT
                COUNT([contacts].[idProspect])
                FROM [contacts]
                WHERE contacts.idProspect = ${idProspecto}) AS [numeroContactos]
            FROM [applications] JOIN [clients] ON [applications].[idClient] = [clients].[idClient]
            JOIN [prospects] ON [clients].[idClient] = [prospects].[idProspect]
            WHERE [idProspect] = ${idProspecto}
            AND [applications].[deletedAt] IS NULL
            AND [clients].[deletedAt] IS NULL
            AND [prospects].[deletedAt] IS NULL`,
            { type: QueryTypes.SELECT })

        let info2 = await Refer.findAll({
            attributes:
                ['idClient', 'refName', 'numTelefonoReferencia'],
            where: {
                idClient: idProspecto
            }
        });
        
        if(info1 && info2) {
            return res.status(200).json({
                infoSolicitud: info1,
                referencias: info2
            })
        } else {
            return res.status(404).json({ 
                name: "Not Found", 
                message: "El cliente que buscas no existe :("
            })
        }
        } catch(err) {
            next(err);
        }
    }
)

// Integración de los endpoints del router
app.use('/employees', employees)
app.use('/prospects', prospects)
app.use('/applications', applications)
app.use('/contacts', contacts)
app.use('/stores', stores)

// Levantamos el servidor en el puerto 5000
app.listen(port, () => {
        console.log(`The server is running on port ${port}`)
    }) 
    
// Coladera de errores-- Endpoint next
app.use((err, req, res, next)=>{
    console.error(err.stack);
    return res.status(500).json({
        "name":err.name,
        "message": `${err.message}, ${err.original ? err.original : ':('}`,
    })
})