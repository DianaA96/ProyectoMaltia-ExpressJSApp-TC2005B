module.exports=(DB,type) => {
    return DB.define('assessor', {
        idAssessor: {
             type: type.STRING,
             primaryKey: true,
             foreignKey: true,
             references:{
                model: 'employees',
                key: 'idEmployee',
           }
        }
    },{
        paranoid:true
    });
}