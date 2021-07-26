const { QueryTypes, sequelize, query } = require('sequelize');
const Record = require('./models/record/Record');

async function resultFile(idFile){
    const users = await Record.sequelize.query("SELECT idMensagem, idBroker FROM `records` where fileId = " + idFile, { type: QueryTypes.SELECT });
    
    // const users = Record.sequelize.query('SELECT idMensagem, idBroker, min(horarioEnvio) FROM `records` where fileId = ' + idFile +' group by celular', { type: QueryTypes.SELECT });

    console.log(users);

}

module.exports = resultFile;
