const fs = require('fs');
const p = require( 'path' );


/**
 * Move o arquivo conforme parametros fornecidos
 * @param {string} msg - pode ser informado uma mensagem para aparecer no console.log
 * @param {string} status - Status fixo  processedFile ou invalidFile
 * @param {string} fileName - nome do arquivo que sera movido 
 * @return {Promise} - Retorna uma promise
 */
function moveFile(msg, status, fileName){
    return new Promise((resolve, reject) => {
        let invalidFilePath = p.resolve("invalid_files", fileName);
        let processedFilePath = p.resolve("processed_files", fileName);
        let filePath = p.resolve("files");

        console.log(p.resolve(filePath, fileName));
        console.log(invalidFilePath);

        if(status === 'processedFile'){
            fs.rename(p.resolve(filePath, fileName), processedFilePath, () => {
                console.log(msg)
            });
        }else if(status === 'invalidFile'){
            fs.rename(p.resolve(filePath, fileName), invalidFilePath, () => {
                console.log(msg)
            });
        }

        resolve();
    });
    
}

module.exports = moveFile;