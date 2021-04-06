module.export=(DB,type) => {

    //  idCliente int,
	//  nombreRef varchar (45) not null,
	//  telefonoRef varchar (45) not null unique,
	//  primary key (idCliente,nombreRef,telefonoRef),
	//  foreign key (idCliente) references CLIENTE(idProspecto)

    return DB.define('referencia', {
        idCliente: {
             type: type.INTEGER,
             primaryKey: true,
             references:{
                 model: cliente,
                 key: idProspecto
            }
        },

        nombreRef:{
            type: type.STRING,
            primaryKey: true,
            noEmpty: true
        },

        telefonoRef:{
            type: type.STRING,
            primaryKey: true,
            noEmpty:true,
            unique:true,
        },

    },{
        paranoid:true
    });
}