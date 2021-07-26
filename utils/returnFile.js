const { QueryTypes } = require('sequelize');
const Record = require('../models/record/Record');
const createReturn = require('./createReturn');

async function resultFile(idFile){
    
    const users = await Record.sequelize.query('SELECT idMensagem, idBroker, min(horarioEnvio) FROM `records` where fileId = ' + idFile +' group by celular', { type: QueryTypes.SELECT });

    let result = [];

    users.forEach(element => {
        data = element.idMensagem + ":" + element.idBroker;
        result.push(data);
    });
    
    createReturn(result, idFile);

}


module.exports = resultFile;
