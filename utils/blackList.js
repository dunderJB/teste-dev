
const axios = require('axios');
const fetch = require('node-fetch');

function isBlackList(idFile){
    return new Promise((resolve, reject) => {
        resolve("oi estou funcionando " + idFile);
    });

    // const teste = fetch('https://front-test-pg.herokuapp.com/blacklist/' + clientPhone).then(res => {
    //     console.log(res.status);
    // });

    // return teste;
    // const { data } = await  axios.get('https://front-test-pg.herokuapp.com/blacklist/' + clientPhone);
    // return data;


    // axios.get('https://front-test-pg.herokuapp.com/blacklist/' + clientPhone)
    // .then((res) => {
    //     console.log(res.status);
    //     return true;
    // }).catch((err) => {
    //     return false;
    // });


}

// console.log(isBlackList('21914683666'));

module.exports = isBlackList;

