module.exports=(DB,type) => {
    return DB.define('analyst', {
        idAnalyst: {
             type: type.STRING,
             primaryKey:true,
             references:{
                model:'employee',
                key:'idEmployee',
           }
        },
        departamento:{
            type: type.STRING,
            defaultValue:("OFICINA CENTRAL"),
        }
    },{
        timestamps: false,
        paranoid: false,
    });
}