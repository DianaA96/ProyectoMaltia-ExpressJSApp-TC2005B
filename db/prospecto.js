const { BOOLEAN } = require("sequelize");

module.export=(DB,type) => {
    return DB.define('prospecto', {
        idCliente: {
             type: type.INTEGER,
             primaryKey:true,
             autoIncrement:true,
         },
        idAsesor: {
            type: type.INTEGER,
            references:{
                model:empleado,
                key:idEmpleado,
           }
        },
        claveTienda:{
            type:type.INTEGER,
        },
        nombre:{
            type: type.STRING,
            noEmpty:true
        },
        apellidoPaterno:{
            type:type.STRING,
            noEmpty:true
        },
        apellidoMaterno:{
            type:type.STRING,
        },
        fechaRegistro:{
            type:type.DATE,
        },
        correoElectronico:{
            type:type.STRING,
            unique:true,
        },
        numeroTelefono:{
            type:type.STRING,
            noEmpty:true,
            unique:true,
        }
    },{
        paranoid:true
    });
}
