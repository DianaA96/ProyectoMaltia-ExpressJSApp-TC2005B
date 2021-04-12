module.export=(DB,type) => {
    return DB.define('tienda', {
        idAsesor: {
             type: type.STRING,
             noEmpty:true,
             references:{
                 model:asesor,
                 key:idAsesor,
            }
        },
        claveTienda:{
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