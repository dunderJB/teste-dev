const File = require("./File");
const saveRecords = require("../record/RecordController")


function saveFile(path) {
    return new Promise((resolve, reject) => {
        const fileName = String(path.split('\\').slice(1));
        console.log(fileName)
        File.create({
            fileName: fileName,
        }).then( idFile => {
            console.log('salvando nome do arquivo com id ' + idFile.id);
            resolve(idFile.id);
        });
    });
}


// function saveFile(path, callBack) {
//     const fileName = String(path.split('\\').slice(1));
//     console.log(fileName)
//     File.create({
//         fileName: fileName,
//     }).then( idFile => {
//         return idFile.id;
//     });;
//     callBack();
// }

module.exports = saveFile;