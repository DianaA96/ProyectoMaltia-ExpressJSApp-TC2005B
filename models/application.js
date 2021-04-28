module.exports=(DB,type) => {

    return DB.define('application', {

        idApplication: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        idAnalyst: {
            type: type.STRING,
            foreignKey: true,
            references:{
                model: 'analysts',
                key: 'idAnalyst'
           }
        },

        idAssessor: {
            type: type.STRING,
            foreignKey: true,
            references:{
                model: 'assessors',
                key: 'idAssessor'
           }
        },

        idClient: {
            type: type.INTEGER,
            foreignKey: true,
            references:{
                model: 'clients',
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

        fechaAuditoria: {
            type: type.DATE
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