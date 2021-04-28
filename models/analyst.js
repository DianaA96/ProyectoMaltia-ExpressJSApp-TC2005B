module.exports=(DB,type) => {
    return DB.define('analyst', {
        idAnalyst: {
             type: type.STRING,
             primaryKey:true,
             foreignKey: true,
             references:{
                model:'employees',
                key:'idEmployee',
           }
        },
        
        departamento:{
            type: type.STRING,
            defaultValue:("OFICINA CENTRAL"),
        }
    },{
        paranoid:true
    });
}