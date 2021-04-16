module.export=(DB,type) => {

    return DB.define('reference', {
        idClient: {
             type: type.INTEGER,
             primaryKey: true,
             references:{
                 model: client,
                 key: idClient
            }
        },

        refName:{
            type: type.STRING,
            primaryKey: true,
            noEmpty: true
        },

        refNumber:{
            type: type.STRING,
            noEmpty:true,
            unique:true,
        }
    },{
        paranoid:true
    });
}