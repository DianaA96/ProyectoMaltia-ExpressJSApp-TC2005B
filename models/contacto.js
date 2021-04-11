module.export=(DB,type) => {
    return DB.define('contacto', {
        numContacto: {
             type: type.INTEGER,
             primaryKey:true,
             autoIncrement: true
        },
        idProspecto: {
            type: type.INTEGER,
            primaryKey:true,
            references:{
               model:prospecto,
               key:idProspecto,
          }
       },
       fechaContacto:{
           type: type.DATE
       },
       compromiso:{
           type:type.ENUM('No atiende','No está interesado','Número equivocado','Inicia solicitud','Tomando una decisión'),
       }
    },{
        paranoid:true
    });
}