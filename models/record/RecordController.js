const Record = require("./Record");
const { phoneValidate, hourValidate, messageValidate, brokerValidate } = require('../../utils/validator');
const axios = require('axios');
const resultFile = require('../../index');
var p = require( 'path' );
var lineReader = require('line-reader');


function saveRecords(path, idFile){
    return new Promise((resolver, reject) => {
        let filePath= p.resolve("files\\" + path.split('\\').slice(1));
        console.log('gravando linhas do arquivo ');
        lineReader.eachLine(filePath, function(line, last) {
            let register = line.split(';');
    
            let celular =  phoneValidate(register[1], register[2]);
            let horarioEnvio = hourValidate(register[4]);  
            let mensagem = messageValidate(register[5]); 
            let clientPhone = register[1] + register[2];
            
            axios.get('https://front-test-pg.herokuapp.com/blacklist/' + clientPhone)
            .then(() => {
    
            }).catch(() => {
                if(celular && horarioEnvio && mensagem){
                    Record.create({
                        idMensagem: register[0],
                        ddd: register[1],
                        celular: register[2],
                        operadora: register[3],
                        horarioEnvio: register[4],
                        mensagem: register[5],
                        idBroker: brokerValidate(register[3]),
                        fileId: idFile
                    });
                }
                
            });
    
            if(last){
                resolver(idFile);
                return false;
            };
        });
    });
      
}


module.exports = saveRecords;
