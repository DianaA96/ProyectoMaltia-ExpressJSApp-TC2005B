module.export=(DB,type) => {
    return DB.define('tienda', {
        idEmpleado: {
             type: type.STRING,
             noEmpty:true,
             references:{
                 model:empleado,
                 key:idEmpleado,
            }
        },
        claveTienda:{
            type: type.INTEGER,
            primarykey:true,
            autoincrement:true
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