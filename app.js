const express = require('express');
const app = express();
const chokidar = require('chokidar');
const fs = require('fs');
const connection = require('./database/database');
const startEvents = require("./utils/startEvents");
const p = require( 'path' );


connection
    .authenticate()
    .then(() => {
        console.log('Successful to connect database')
    })
    .catch((err) => {
        console.log(err + ' error to connect database!')
    });


chokidar.watch('files').on('all', (event, path) => {

    if(event == 'add'){

        const valid_file = 'nome_arquivo_valido';
        const invalid_file = 'invalid_files\\' + path.split('\\').slice(1);
        const processed_file = 'processed_files\\' + path.split('\\').slice(1);

        if(path.includes(valid_file)){

            let filePath = p.resolve("files\\" + path.split('\\').slice(1));

            startEvents(filePath);

        }else{
            fs.rename(path, invalid_file, () => {
                console.log('Arquivo fora do homologado movido para a pasta de arquivos inválidos')
            })
        }
    }
});


app.listen(8080)