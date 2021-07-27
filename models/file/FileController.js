const File = require("./File");



/**
 * Salva o nome do arquivo como resgistro no banco de dados
 * @param {string} path - diretorio da aplicacao onde o arquivo é disponibilizado
 * @return {Promise} - Retorna uma promise
 */
function saveFile(path) {
    return new Promise((resolve, reject) => {
        const fileName = String(path.split('\\').slice(-1));
        File.create({
            fileName: fileName,
        }).then( idFile => {
            resolve(idFile.id);
        });
    });
}


module.exports = saveFile;