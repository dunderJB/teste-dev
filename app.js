const express = require('express');
const app = express();
const chokidar = require('chokidar');
const fs = require('fs');
const connection = require('./database/database');
const startEvents = require("./utils/startEvents");
const p = require( 'path' );
const createDir = require('./utils/createDir');
const moveFile = require('./utils/moveFile');


connection
    .authenticate()
    .then(() => {
        console.log('Successful to connect database')
    })
    .catch((err) => {
        console.log(err + ' error to connect database!')
    });

createDir();

chokidar.watch('files').on('all', (event, path) => {

    if(event == 'add'){
        
        const valid_file = 'nome_arquivo_valido';
        let fileName = String(path.split('\\').slice(-1));

        if(path.includes(valid_file)){

            let filePath = p.resolve("files\\" + path.split('\\').slice(1));

            startEvents(filePath, fileName);

        }else{
            let msg = "Arquivo fora do homologado"
            moveFile(msg, 'invalidFile', fileName);
        }
    }
});


app.listen(8080)