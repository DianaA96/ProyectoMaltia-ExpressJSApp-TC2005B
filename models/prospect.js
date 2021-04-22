module.exports=(DB,type) => {
    return DB.define('prospect', {
        idProspect: {
             type: type.INTEGER,
             primaryKey:true,
             autoIncrement:true,
        },

        idAssessor: {
            type: type.STRING,
            foreignKey: true,
            references:{
                model: 'assessors',
                key: 'idAssessor',
           }
        },

        idStore:{
            type:type.INTEGER,
            foreignKey: true,
            references:{
                model: 'stores',
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

        createdAt:{
            type:type.STRING,
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
        paranoid:true
    });
}
