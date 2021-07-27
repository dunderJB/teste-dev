const saveFile = require("../models/file/FileController");
const saveRecords = require("../models/record/RecordController");
const returnFile = require("./returnFile");
const moveFile = require("../utils/moveFile");


/**
 * Async function para ordenar o processamento dos eventos
 * @param {string} filePath - caminho do arquivo valido
 * @param {string} fileName - nome do arquivo valido 
 * @return {Promise} - Retorna uma promisse
 */
async function start(filePath, fileName){
    const dataSave = await saveFile(filePath);
    const dataRecords = await saveRecords(filePath, dataSave);
    const msg = "Arquivo processado";
    const movedFile = await moveFile(msg, 'processedFile', fileName);
    returnFile(dataRecords);
}

module.exports = start;