module.exports = (DB,type) => {
    return DB.define('store', {

        idStore:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        idAssessor: {
             type: type.STRING,
             foreignKey: true,
             references:{
                 model: 'assessors',
                 key: 'idAssessor',
            }
        },

        nombreTienda:{
            type: type.STRING,
            allowNull: false,
            unique:true
        },
        
        tiendaAcro:{
            type:type.CHAR,
            allowNull: false,
            unique:true
        }
    },{
        paranoid:true
    });
}