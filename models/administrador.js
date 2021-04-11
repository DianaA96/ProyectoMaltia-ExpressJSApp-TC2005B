module.export=(DB,type) => {
    return DB.define('administrador', {
        idAdministrador: {
             type: type.INTEGER,
             primaryKey:true,
             references:{
                model:empleado,
                key:idEmpleado,
           }
        },
        departamento:{
            type: type.INTEGER,
            defaultValue:("OFICINA CENTRAL"),
        }
    },{
        paranoid:true
    });
}
