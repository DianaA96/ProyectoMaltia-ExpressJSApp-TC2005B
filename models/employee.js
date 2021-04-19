
module.exports=(DB,type) => {
    return DB.define('employee', {
        idEmployee: {
             type: type.STRING,
             primaryKey:true,
         },
        nombre: {
             type: type.STRING,
             allowNull: false,
         }, 
        apellidoPaterno :{
             type:type. STRING,
             allowNull: false,
         },
        apellidoMaterno:{
            type: type.STRING,
         },
        correoElectronico: {
             type:type.STRING,
             allowNull: false,
             unique:true,
             validate:{
                 isEmail:true,
             }
         },
        numTelefono:{
            type: type.STRING,
            allowNull: false,
            unique:true,
        },
        puesto: {
            type:type.STRING,
            allowNull: false,
        },
        contrasena: {
            type:type.STRING,
            allowNull: false,
        }
     },{
        //soft delete option
        timestamps: false,
        paranoid: false,
     });
}