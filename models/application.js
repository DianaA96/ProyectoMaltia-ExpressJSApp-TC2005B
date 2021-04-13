module.export=(DB,type) => {

    return DB.define('application', {

        idApplication: {
            type: type.INTEGER,
            primaryKey: true,
        },

        idAnalyst: {
            type: type.INTEGER,
            references:{
                model: analyst,
                key: idAnalyst
           }
        },

        idAssessor: {
            type: type.INTEGER,
            references:{
                model: assessor,
                key: idAssessor
           }
        },

        idClient: {
            type: type.INTEGER,
            references:{
                model: client,
                key: idClient
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
            type: type.ENUM('Autorizado', 'No autorizado', 'No revisado', 'Dispuesto'),
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