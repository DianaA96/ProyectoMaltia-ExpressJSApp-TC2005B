module.export=(DB,type) => {
    return DB.define('prospect', {
        idProspect: {
             type: type.INTEGER,
             primaryKey:true,
             autoIncrement:true,
         },
        idAssessor: {
            type: type.INTEGER,
            references:{
                model:assessor,
                key:idAssessor,
           }
        },
        idStore:{
            type:type.INTEGER,
            references:{
                model:store,
                key:idStore,
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
        numTelefono:{
            type:type.STRING,
            noEmpty:true,
            unique:true,
        }
    },{
        paranoid:true
    });
}
