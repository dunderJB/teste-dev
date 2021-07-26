const validDDD = require('./ddd');


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


function messageValidate(clientMessage){
    return clientMessage.length <= 140 ? true : false;
}


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
        return broker = ''
    }
};

module.exports = {
    phoneValidate,
    hourValidate,
    messageValidate,
    brokerValidate
}