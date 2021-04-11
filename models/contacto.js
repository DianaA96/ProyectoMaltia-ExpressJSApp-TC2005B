/*dejar al ultimo, preguntar a Grettel si la retro 
en esta tabla es correcta*/
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
           type: type.DATE,
           primaryKey:true,
       },
       compromiso:{
           type:type.ENUM('No atiende','No está interesado','Número equivocado','Inicia solicitud','Tomando una decisión'),
            primaryKey:true,
        }
    },{
        paranoid:true
    });
}