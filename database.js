require('dotenv').config();
const { Sequelize } = require('sequelize');

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

// Nueva instancia de la base de datos usando sequelize
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

// Modelos
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


// Sintaxis de promesa. Funciones que se ejecutan de manera asíncrona
// Función asíncrona que nos permite entrar a la base de datos
DB.authenticate()
    .then(() => {
        console.log('Connection was established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err)
    }); 

// Función que deberemos ejecutar para hacer drop de las tablas antes del sync
//DB.sync({ force:true }) 
DB.sync().then(() => {
    console.log('Database and tables created!')
}).catch(err => console.error(err))

module.exports = {
    Administrator,
    Analyst,
    Application,
    Assessor,
    Client,
    Contact,
    Employee,
    Prospect,
    Reference,
    Store
}

//const usersRouter = require('./users');
//app.use('./users', usersRouter);

//Añadir los archivos de router
//Se insertan todos los endpoints en esta parte del código