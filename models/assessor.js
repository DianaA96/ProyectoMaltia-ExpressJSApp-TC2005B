module.exports=(DB,type) => {
    return DB.define('assessor', {
        idAssessor: {
             type: type.STRING,
             primaryKey:true,
             references:{
                model: 'employee',
                key: 'idEmployee',
           }
        }
    },{
        // paranoid:true
        timestamps: false,
        paranoid: false,
    });
}