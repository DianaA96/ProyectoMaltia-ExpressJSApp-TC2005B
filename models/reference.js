module.exports=(DB,type) => {

    return DB.define('refer', {
        idClient: {
             type: type.INTEGER,
             primaryKey: true,
             references:{
                 model: 'client',
                 key: 'idClient'
            }
        },

        refName:{
            type: type.STRING,
            primaryKey: true,
            allowNull: false
        },

        numTelefonoReferencia:{
            type: type.STRING,
            allowNull: false,
            unique:true
        }
    },{
        paranoid:true
    });
}