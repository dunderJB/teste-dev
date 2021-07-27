var fs = require('fs');
const p = require( 'path' );

function createDir(){

    let filePath = p.resolve("files");
    let invalidFilePath = p.resolve("invalid_files");
    let processedFilePath = p.resolve("processed_files");
    let resultFilePath = p.resolve("result_files");
    console.log(filePath)
    console.log(invalidFilePath)
    console.log(processedFilePath)
    console.log(resultFilePath)

    if (!fs.existsSync(filePath) && !fs.existsSync(invalidFilePath) && !fs.existsSync(processedFilePath) && !fs.existsSync(resultFilePath)){
        fs.mkdirSync(filePath);
        fs.mkdirSync(invalidFilePath);
        fs.mkdirSync(processedFilePath);
        fs.mkdirSync(resultFilePath);
    }
}

module.exports = createDir;