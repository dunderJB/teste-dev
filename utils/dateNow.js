

/**
 * Function que pega e formata a data atual
 * @return {Promise} - Retorna a data Atual no formato yyyyMMdd
 */
function today(){
    let data = new Date();
    day  = data.getDate().toString().padStart(2, '0');
    month  = (data.getMonth()+1).toString().padStart(2, '0');
    year  = data.getFullYear();
    return year+month+day;
}

module.exports = today;