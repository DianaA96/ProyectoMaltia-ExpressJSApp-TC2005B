module.export=(DB,type) => {

    return DB.define('solicitud', {

        idSolicitud: {
            type: type.INTEGER,
            primaryKey: true,
        },

        idAnalista: {
            type: type.INTEGER,
            references:{
                model: analista,
                key: idAnalista
           }
        },

        idAsesor: {
            type: type.INTEGER,
            references:{
                model: asesor,
                key: idAsesor
           }
        },

        idCliente: {
            type: type.INTEGER,
            references:{
                model: cliente,
                key: idCliente
           }
        },

        creditoSolicitado: {
            type: type.ENUM('simple','revolvente'),
            noEmpty: true,
        },

        montoSolicitado: {
            type: type.FLOAT,
            noEmpty: true
        },

        fechaSolicitud: {
            type: type.DATE,
            noEmpty: true
        },

        estatus: {
            type: type.STRING,
        },

        firmaSolicitud: {
            type: type.BOOLEAN,
            noEmpty: true
        },

        altaIsi: {
            type: type.BOOLEAN,
        },

        fechaAlta: {
            type: type.DATE,
        },

        auditoriaBuro: {
            type: type.BOOLEAN,
        },

        capacidadZorro: {
            type: type.FLOAT,
        },

        antiguedadZorro: {
            type: type.DATE,
        },

        creditoAutorizado: {
            type: type.ENUM('simple','revolvente'),
            noEmpty: true,
        },

        montoAutorizado: {
            type: type.FLOAT,
        },

        montoDispuesto: {
            type: type.FLOAT,
        },

    },{
        paranoid:true
    });
}