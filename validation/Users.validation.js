const isEmpty = require('./isEmpty');
const validator = require('validator');



module.exports = function ValidateUser(data){
    let errors = {}

    data.customerName = !isEmpty(data.customerName) ? data.customerName : ""
    data.customerAdress = !isEmpty(data.customerAdress) ? data.customerAdress : ""
    data.customerMobileNumber = !isEmpty(data.customerMobileNumber) ? data.customerMobileNumber : ""
    // data.countryCode = !isEmpty(data.countryCode) ? data.countryCode : ""
    // data.countryName = !isEmpty(data.countryName) ? data.countryName : ""
    // data.operatorName = !isEmpty(data.operatorName) ? data.operatorName : ""


    if(validator.isEmpty(data.customerName)){
        errors.customerName = "Required Customer Name!"
    }
    if(validator.isEmpty(data.customerAdress)){
        errors.customerAdress = "Required Customer Adress!"
    }
    if(validator.isEmpty(data.customerMobileNumber)){
        errors.customerMobileNumber = "Required Customer Mobile Number!"
    }

    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


