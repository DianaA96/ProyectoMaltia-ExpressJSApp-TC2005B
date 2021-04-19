module.exports=(DB,type) => {
    return DB.define('prospect', {
        idProspect: {
             type: type.INTEGER,
             primaryKey:true,
             autoIncrement:true,
        },
        idAssessor: {
            type: type.STRING,
            references:{
                model: 'assessor',
                key: 'idAssessor',
           }
        },
        idStore:{
            type:type.INTEGER,
            references:{
                model: 'store',
                key: 'idStore',
            }
        },
        nombre:{
            type: type.STRING,
            allowNull: false
        },
        apellidoPaterno:{
            type:type.STRING,
            allowNull: false
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
            allowNull: false,
            unique:true,
        }
    },{
        // paranoid:true
        timestamps: false,
        paranoid: false,
    });
}
