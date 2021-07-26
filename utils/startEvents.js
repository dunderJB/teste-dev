const saveFile = require("../models/file/FileController");
const saveRecords = require("../models/record/RecordController");
const returnFile = require("./returnFile");


async function start(filePath){
    const dataSave = await saveFile(filePath);
    const dataRecords = await saveRecords(filePath, dataSave);
    returnFile(dataRecords);
}

module.exports = start;