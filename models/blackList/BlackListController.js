// const BlackList = require("./BlackList");
// const axios = require("axios");


// function createBlackList(){
//     return new Promise((resolve, reject) => {
//         axios.get('https://front-test-pg.herokuapp.com/blacklist')
//         .then(response => {
//             const listPhones = response.data;

//             listPhones.forEach(element => {
//                 BlackList.create({
//                     phone: element.phone
//                 });
//             });
//             resolve();
//         })
//     });
// }


// module.exports = createBlackList;