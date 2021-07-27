const Sequelize = require("sequelize");
const connection = require("../../database/database");
const File = require("../file/file");

const Record = connection.define('records', {
    idMensagem:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ddd:{
        type: Sequelize.STRING,
        allowNull: false
    },
    celular:{
        type: Sequelize.STRING,
        allowNull: false
    },
    operadora:{
        type: Sequelize.STRING,
        allowNull: false
    },
    horarioEnvio:{
        type: Sequelize.TIME,
        allowNull: false
    },
    mensagem:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    idBroker:{
        type: Sequelize.TEXT,
        allowNull: false
    },

});

File.hasMany(Record, { onDelete: 'cascade', hooks: true });
Record.belongsTo(File);

Record.sync();

module.exports = Record;