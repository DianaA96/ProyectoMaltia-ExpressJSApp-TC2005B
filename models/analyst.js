module.export=(DB,type) => {
    return DB.define('analyst', {
        idAnalyst: {
             type: type.INTEGER,
             primaryKey:true,
             references:{
                model:employee,
                key:idEmployee,
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