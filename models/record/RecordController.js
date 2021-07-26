const Record = require("./Record");
const { phoneValidate, hourValidate, messageValidate, brokerValidate } = require('../../utils/validator');
const axios = require('axios');
const readline = require('readline');
const fs = require('fs')


function saveRecords(path, idFile) {
    return new Promise(async (resolve, reject) => {

        const readInterface = readline.createInterface({
            input: fs.createReadStream(path)
        });

        for await (const line of readInterface) {
            let register = line.split(';');
            let celular = phoneValidate(register[1], register[2]);
            let horarioEnvio = hourValidate(register[4]);
            let mensagem = messageValidate(register[5]);
            let clientPhone = register[1] + register[2];

            await axios.get('https://front-test-pg.herokuapp.com/blacklist/' + clientPhone)
                .catch(async () => {
                    if (celular && horarioEnvio && mensagem) {
                        await Record.create({
                            idMensagem: register[0],
                            ddd: register[1],
                            celular: register[2],
                            operadora: register[3],
                            horarioEnvio: register[4],
                            mensagem: register[5],
                            idBroker: brokerValidate(register[3]),
                            fileId: idFile
                        });
                        console.log("oi")
                    }
                });
        }

        resolve(idFile)
    });
}

module.exports = saveRecords;