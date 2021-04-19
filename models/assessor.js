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
        timestamps: false,
        paranoid: false,
    });
}