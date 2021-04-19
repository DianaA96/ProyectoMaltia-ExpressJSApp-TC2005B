module.exports=(DB,type) => {

    return DB.define('application', {

        idApplication: {
            type: type.INTEGER,
            primaryKey: true,
        },

        idAnalyst: {
            type: type.STRING,
            references:{
                model: 'analyst',
                key: 'idAnalyst'
           }
        },

        idAssessor: {
            type: type.STRING,
            references:{
                model: 'assessor',
                key: 'idAssessor'
           }
        },

        idClient: {
            type: type.INTEGER,
            references:{
                model: 'client',
                key: 'idClient'
           }
        },

        creditoSolicitado: {
            type: type.ENUM('simple','revolvente'),
            allowNull: false,
        },

        montoSolicitado: {
            type: type.FLOAT,
            allowNull: false
        },

        fechaSolicitud: {
            type: type.DATE,
            allowNull: false
        },

        estatus: {
            type: type.ENUM('Autorizado', 'No autorizado', 'No revisado', 'Dispuesto'),
        },

        firmaSolicitud: {
            type: type.BOOLEAN,
            allowNull: false
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
            allowNull: false,
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