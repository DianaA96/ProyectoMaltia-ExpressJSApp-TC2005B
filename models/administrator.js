module.exports = (DB,type) => {
    return DB.define('administrator', {
        idAdministrator: {
             type: type.STRING,
             primaryKey:true,
             references:{
                model: 'employee',
                key: 'idEmployee',
           }
        },
        departamento:{
            type: type.STRING,
            defaultValue:("OFICINA CENTRAL"),
        }
    },{
        paranoid:true
    })
};
