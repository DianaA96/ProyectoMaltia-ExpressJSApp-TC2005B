module.export=(DB,type) => {
    return DB.define('cliente', {
        idProspecto: {
            type: type.INTEGER,
            primaryKey:true,
            references:{
               model:prospecto,
               key:idProspecto,
          }
       },
       fechaNacimiento:{
           type: type.DATE,
           allowNull: false
       },
       numClienteZorro:{
           type: type.INTEGER,
           autoIncrement: true,
           unique: true,
           allowNull: false
       },
       numIne:{
        type: type.INTEGER,
        unique: true,
        allowNull: false
       },
       direccion:{
        type: type.STRING,
        allowNull: false
       }
    },{
        paranoid:true
    });
}