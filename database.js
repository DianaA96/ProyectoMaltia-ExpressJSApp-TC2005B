require('dotenv').config();

// Importamos Sequelize
const { Sequelize } = require('sequelize');

// Importamos archivos de modelos
const AdministratorModel = require('./models/administrator');
const AnalystModel = require('./models/analyst');
const ApplicationModel = require('./models/application');
const AssessorModel = require('./models/assessor');
const ClientModel = require('./models/client');
const ContactModel = require('./models/contact');
const EmployeeModel = require('./models/employee');
const ProspectModel = require('./models/prospect');
const ReferModel = require('./models/reference');
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
const Refer = ReferModel(DB, Sequelize);
const Store = StoreModel(DB, Sequelize);

//Relaciones
// // Employee
// Employee.Administrator = Employee.hasOne(Administrator)
// Employee.Assessor = Employee.hasOne(Assessor)
// Employee.Analyst = Employee.hasOne(Analyst)

// // Administrator
// Administrator.belongsTo(Employee,{foreignKey: 'idAdministrator'})

// // Assessor
// Assessor.belongsTo(Employee,{foreignkey:'idAssessor'})
// Assessor.stores = Assessor.hasMany(Store)
// Assessor.prospects = Assessor.hasMany(Prospect)
// Assessor.applications = Assessor.hasMany(Application)

// // Store
// Store.belongsTo(Assessor,{foreignKey: 'idAssessor'})
// Store.Prospects = Store.hasMany(Prospect)

// //Prospect
// Prospect.belongsTo(Store,{ foreignKey : 'idStore'})
// Prospect.belongsTo(Assessor,{ foreignKey : 'idAssessor'})
// Prospect.Client = Prospect.hasOne(Client)
// Prospect.Contacts = Prospect.hasMany(Contact)

// //Client
// Client.belongsTo(Prospect ,{ foreignKey: 'idProspect' })
// Client.Refers = Client.hasMany(Refer)
// Client.Application = Client.hasOne(Application)

// // Contact
// Contact.belongsTo(Prospect,{foreignKey: 'idProspect'})

// // Refer
// Refer.belongsTo(Client,{foreignKey: 'idClient'})

// // Application
// Application.belongsTo(Analyst, {foreignKey: 'idAnalyst'})
// Application.belongsTo(Client, {foreignKey: 'idClient'})
// Application.belongsTo(Assessor, {foreignKey: 'idAssessor'})

// // Analyst
// Analyst.Applications = Analyst.hasMany(Application)
// Analyst.belongsTo(Employee, {foreignKey: 'idAnalyst'}) 


// Promesa de autenticación
DB.authenticate()
    .then(() => {
        console.log('Connection was established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database: ', err)
    }); 

// Parámetro que se pasa a la función sync si deseamos hacer drop de las tablas (!)
//{ force: true }
DB.sync().then(() => {
    console.log('Database and tables created!')
}).catch(err => console.error(err))

// Se exportan los modelos (incluida la base de datos)
module.exports = {
    Administrator,
    Analyst,
    Application,
    Assessor,
    Client,
    Contact,
    Employee,
    Prospect,
    Refer,
    Store,
    DB
}