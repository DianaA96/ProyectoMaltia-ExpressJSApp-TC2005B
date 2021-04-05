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
            type: type.INETEGER,
            primaryKey:true,
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