const { BOOLEAN } = require("sequelize");

module.export=(DB,type) => {
    return DB.define('empleado', {
        idEmpleado: {
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
            /*noEmpty:true,
            puede solo tener un apellido 
            */
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
            type: type.STING,
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
        },
        activo:{
            type: type.BOOLEAN,
            default: false
        },
     },{
         paranoid:true
     });
}