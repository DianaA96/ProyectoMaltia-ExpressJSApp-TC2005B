const { BOOLEAN } = require("sequelize");

module.export=(DB,type) => {
    return DB.define('prospecto', {
        idProspecto: {
             type: type.INTEGER,
             primaryKey:true,
             autoIncrement:true,
         },
        idAsesor: {
            type: type.INTEGER,
            references:{
                model:asesor,
                key:idAsesor,
           }
        },
        claveTienda:{
            type:type.INTEGER,
            references:{
                model:tienda,
                key:claveTienda,
            }
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
