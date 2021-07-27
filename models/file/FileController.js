const File = require("./File");


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