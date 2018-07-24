const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');
function experienceInputsValidate(inputs){
    const errors = {};

   //Required fields setting
    inputs.title = !isEmpty(inputs.title) ? inputs.title :'';
    inputs.company = !isEmpty(inputs.company) ? inputs.company :'';
    inputs.from = !isEmpty(inputs.from) ? inputs.from :'';


    if(Validator.isEmpty(inputs.title)){
        errors.title = 'Job Title Required'
    }
    if(Validator.isEmpty(inputs.company)){
        errors.company = 'Company Filed is required'
    }
    if(Validator.isEmpty(inputs.from)){
        errors.from = 'From field is required'
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }




}
module.exports = experienceInputsValidate;