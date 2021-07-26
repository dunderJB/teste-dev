const express = require('express');
const app = express();
const chokidar = require('chokidar');
const fs = require('fs');
const connection = require('./database/database');
const Record = require('./models/record/Record');
const File = require('./models/file/File');
// const createBlackList = require('./models/blackList/BlackListController');
const BlackList = require('./models/blackList/BlackList');
const Sequelize = require('sequelize');
const saveRecords = require("./models/record/RecordController")
const blackList = require('./utils/blackList');
const resultFile = require('./index');
const saveFile = require('./models/file/FileController');

// Database connection
connection
    .authenticate()
    .then(() => {
        console.log('Successful to connect database')
    })
    .catch((err) => {
        console.log(err + ' error to connect database!')
    });

// File Handler
chokidar.watch('files').on('all', (event, path) => {

    if(event == 'add'){

        const valid_file = 'nome_arquivo_valido';
        const invalid_file = 'invalid_files\\' + path.split('\\').slice(1);
        const processed_file = 'processed_files\\' + path.split('\\').slice(1);

        if(path.includes(valid_file)){


            async function start(path){
                const dataSave = await saveFile(path);
                console.log(dataSave);
                const dataRecords = await saveRecords(path, dataSave);
                console.log(dataRecords);
                console.log("fazer outra coisa");
                
            }
            
            start(path);
            // saveFile(path).then(idFile => {
            //     saveRecords(path, idFile);
            // })
            // saveFile(path).then(idFile => {

            //     saveRecords(path, idFile).then(() => {
            //         console.log(resultFile(idFile));
            //     });
                
            // });
            
            // saveFile(path);

            
        }else{
            fs.rename(path, invalid_file, () => {
                console.log('Arquivo fora do homologado movido para a pasta de arquivos inválidos')
            })
        }
    }
});


app.listen(8080)