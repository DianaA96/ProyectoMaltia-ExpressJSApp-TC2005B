const express = require('express');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');

const AdministratorModel = require('./models/administrator');
const AnalystModel = require('./models/analyst');
const ApplicationModel = require('./models/application');
const AssessorModel = require('./models/assessor');
const ClientModel = require('./models/client');
const ContactModel = require('./models/contact');
const EmployeeModel = require('./models/employee');
const ProspectModel = require('./models/prospect');
const ReferenceModel = require('./models/reference');
const StoreModel = require('./models/store');

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
);

//models
const Administrator = AdministratorModel(DB, Sequelize);
const Analyst = AnalystModel(DB, Sequelize);
const Application = ApplicationModel(DB, Sequelize);
const Assessor = AssessorModel(DB, Sequelize);
const Client = ClientModel(DB, Sequelize);
const Contact = ContactModel(DB, Sequelize);
const Employee = EmployeeModel(DB, Sequelize);
const Prospect = ProspectModel(DB, Sequelize);
const Reference = ReferenceModel(DB, Sequelize);
const Store = StoreModel(DB, Sequelize);



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