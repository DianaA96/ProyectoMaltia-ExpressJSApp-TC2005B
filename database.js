const express = require('express');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const DB = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASS,

    {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: 1433,
        protocol: 'tcp',
        dialectOptions: {
            encrypt: true,
        }
    }
)

//models



DB.authenticate()
    .then(() => {
        console.log('Connection was established successfully.')
    })
    .catch((err) => {
        console.log('Unable to connect to the database: ', err)
    }); 

app.use(bodyParser.json());

//const usersRouter = require('./users');
//app.use('./users', usersRouter);

//Añadir los archivos de router


//Se insertan todos los endpoints en esta parte del código

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})