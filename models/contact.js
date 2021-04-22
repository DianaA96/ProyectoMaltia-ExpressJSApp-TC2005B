/*dejar al ultimo, preguntar a Grettel si la retro 
en esta tabla es correcta*/
module.exports=(DB,type) => {
    return DB.define('contact', {
        idContact: {
             type: type.INTEGER,
             primaryKey:true,
        },

        idProspect: {
            type: type.INTEGER,
            primaryKey:true,
            foreignKey: true,
            references:{
               model: 'prospects',
               key: 'idProspect',
          }
       },

       fechaContacto:{
           type: type.DATE,
       },
       
        compromiso:{
           type:type.ENUM('No atiende','No está interesado','Número equivocado','Inicia solicitud','Tomando una decisión'),
        }
    },{
        paranoid:true
    });
}