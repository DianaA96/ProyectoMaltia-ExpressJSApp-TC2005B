module.export=(DB,type) => {
    return DB.define('store', {
        idAssessor: {
             type: type.INTEGER,
             noEmpty:true,
             references:{
                 model:assessor,
                 key:idAssessor,
            }
        },
        idStore:{
            type: type.INTEGER,
            primarykey:true,
            autoIncrement:true
        },
        nombreTienda:{
            type: type.STRING,
            noEmpty:true,
            unique:true
        },
        tiendaAcro:{
            type:type.STRING,
            noEmpty:true,
            unique:true
        }
    },{
        paranoid:true
    });
}