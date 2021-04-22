module.exports=(DB,type) => {
    return DB.define('client', {
        idClient: {
            type: type.INTEGER,
            primaryKey:true,
            foreignKey: true,
            references:{
               model: 'prospects',
               key: 'idProspect',
          }
        },

        fechaNacimiento:{
            type: type.DATE,
            allowNull: false
        },

        numClienteZorro:{
            type: type.INTEGER,
            unique: true,
            allowNull: false
        },

        numIne:{
            type: type.INTEGER,
            unique: true,
            allowNull: false
        },
        
        direccion:{
            type: type.STRING,
            allowNull: false
        }
        },{
            paranoid:true
        }
    );
}