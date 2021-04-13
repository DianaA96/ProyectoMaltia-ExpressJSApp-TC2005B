const { BOOLEAN } = require("sequelize");

module.export=(DB,type) => {
    return DB.define('employee', {
        idEmployee: {
             type: type.INTEGER,
             primaryKey:true,
             autoIncrement:true,
         },
        nombre: {
             type: type.STRING,
             noEmpty:true,
         }, 
        apellidoPaterno :{
             type:type. STRING,
             noEmpty:true,
         },
        apellidoMaterno:{
            type: type.STRING,
         },
        correoElectronico: {
             type:type.STRING,
             noEmpty:true,
             unique:true,
             validate:{
                 isEmail:true,
             }
         },
        numTelefono:{
            type: type.STRING,
            noEmpty:true,
            unique:true,
        },
        puesto: {
            type:type.STRING,
            noEmpty:true,
        },
        contrasena: {
            type:type.STRING,
            noEmpty:true,
        }
     },{
         paranoid:true
     });
}