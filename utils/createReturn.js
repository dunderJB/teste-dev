const today = require('./dateNow');
const p = require( 'path' );
const fs = require('fs');


/**
 * Cria um arquivo de retorno na pasta result_files
 * @param {array} array - Array, equivalente a cada linha do arquivo que foi gravado
 * @param {string} idFile - IdFie, id do arquivo que foi gravado na base de dados  
 */
function createReturn(array, idFile){
    
    let pathFileResult = p.resolve("result_files\\" + "arquivo_retorno_"+ idFile + "_" + today() + ".txt");

    let file = fs.createWriteStream(pathFileResult);
    file.on('error', function(err) { console.log(err) });
    array.forEach(value => file.write(`${value}\r\n`));
    file.end();
}

module.exports = createReturn;