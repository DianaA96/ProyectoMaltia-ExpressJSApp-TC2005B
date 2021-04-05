module.export=(DB,type) => {
    return DB.define('asesor', {
        idEmpleado: {
             type: type.INTEGER,
             primaryKey:true,
             references:{
                model:empleado,
                key:idEmpleado,
           }
        },
        departamento:{
            type: type.INTEGER,
            defaultValue:("Oficina Central"),
        }
    },{
        paranoid:true
    });
}