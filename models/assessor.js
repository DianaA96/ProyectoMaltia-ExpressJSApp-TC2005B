module.export=(DB,type) => {
    return DB.define('assessor', {
        idAssessor: {
             type: type.INTEGER,
             primaryKey:true,
             references:{
                model:employee,
                key:idEmployee,
           }
        }
    },{
        paranoid:true
    });
}