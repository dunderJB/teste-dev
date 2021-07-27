const validDDD = require('./ddd');

/**
 * Valida DDD e Telefone conforme regra de negocio
 * @param {string} clientDDD - DDD
 * @param {string} clientPhone - Telefone 
 * @return {boolean} - Retorna True para telefones validos
 */
function phoneValidate(clientDDD, clientPhone){

    let dddValid = false;
    
    for(ddd of validDDD){
        if(clientDDD === ddd){
            dddValid = true;
            break;
        }
    }

    let firstDigit = clientPhone.substring(0,1);
    let secondDigit = Number(clientPhone.substring(1,2));

    let phoneValid = false;

    if(clientPhone.length == 9){
        if(firstDigit === '9' && secondDigit > 6){
            phoneValid = true;
        }
    }

    if(dddValid && phoneValid){
        return true;
    }
}


/**
 * Valida se a hora enviada é menor que a hora estipulada dentro da funcao
 * @param {string} sent_date - Sent_date deve vir no formato hh:mm:ss
 * @return {boolean} - Retorna True para horas validas
 */
function hourValidate(sent_date){
    
    let time = sent_date.split(':');
    let [hour, minute,seconds] = time;

    let limitHour = '19:59:59';
    let [lHour, lMinute, lSeconds] = limitHour.split(':');

    var d = new Date();
    var date1= new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute, seconds));

 
    var date2 = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), lHour, lMinute, lSeconds));
    
    return date1 <= date2 ? true : false;
}


/**
 * Valida o tamanho da string enviada
 * @param {string} clientMessage - String até 140 caracteres
 * @return {boolean} - Retorna True mensagens validas
 */
function messageValidate(clientMessage){
    return clientMessage.length <= 140 ? true : false;
}


/**
 * Valida a broker enviada conforme regra de negocio
 * @param {string} clientBroker - String informando Broker
 * @return {string}- Retorna o valor correspondente para a broker cadastrada ou False para Broker nao homologada
 */
function brokerValidate(clientBroker){
    let oper = clientBroker.toUpperCase();
    let broker = '';

    switch (oper) {
    case 'VIVO':
    case 'TIM':
        return broker = '1'
    case 'CLARO':
    case 'OI':
        return broker = '2'
    case 'NEXTEL':
        return broker = '3'
    default:
        return broker = false;
    }
};

module.exports = {
    phoneValidate,
    hourValidate,
    messageValidate,
    brokerValidate
}