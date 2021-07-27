const Record = require("./Record");
const { phoneValidate, hourValidate, messageValidate, brokerValidate } = require('../../utils/validator');
const axios = require('axios');
const readline = require('readline');
const fs = require('fs')



/**
 * Salva as linhas do arquivo na base de dados
 * @param {string} path - diretorio onde se encontra o arquivo valido
 * @param {string} idFile - Id do arquivo que foi registrado no banco 
 * @return {string} - Retorna o id do arquivo a qual a linhas pertencem
 */
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
            let idBroker = brokerValidate(register[3]);

            await axios.get('https://front-test-pg.herokuapp.com/blacklist/' + clientPhone)
                .catch(async () => {
                    if(register.length == 6 ){
                        if (celular && horarioEnvio && mensagem && idBroker) {
                            await Record.create({
                                idMensagem: register[0],
                                ddd: register[1],
                                celular: register[2],
                                operadora: register[3],
                                horarioEnvio: register[4],
                                mensagem: register[5],
                                idBroker: idBroker,
                                fileId: idFile
                            });
                        }
                    }
                });
        }

        resolve(idFile)
    });
}

module.exports = saveRecords;