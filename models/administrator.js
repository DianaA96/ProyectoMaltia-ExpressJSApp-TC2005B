module.exports = (DB,type) => {
    return DB.define('administrator', {
        idAdministrator: {
             type: type.STRING,
             primaryKey:true,
             foreignKey: true,
             references:{
                model: 'employees',
                key: 'idEmployee',
           }
        },
        
        departamento:{
            type: type.STRING,
            defaultValue:("OFICINA CENTRAL"),
        }
    },{
        paranoid: true
    })
};
