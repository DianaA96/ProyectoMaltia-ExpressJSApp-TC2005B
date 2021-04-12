module.export=(DB,type) => {
    return DB.define('asesor', {
        idAsesor: {
             type: type.INTEGER,
             primaryKey:true,
             references:{
                model:empleado,
                key:idEmpleado,
           }
        },
        departamento:{
            type: type.INTEGER,
            noEmpty:true,
            /*
            defaultValue:("Oficina Central"),
            creo que en la retro solo lo pidio en analista
             y administrador
             eso y en la base de datos no lo tenemos directamente
             asignado a un departamento, va relacionado con la
             tabla tienda
            */
        }
    },{
        paranoid:true
    });
}