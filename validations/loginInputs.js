const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

function loginInputsValidate (input){
    
    const errors = {};
    console.log("loginInputs recived ",input);

    if(isEmpty(input)){
       errors.email = 'Email is required',
       errors.password = 'Password is required' 
    }
    else{
        input.email ? !isEmpty(input.email) : '';
        input.password ? !isEmpty(input.password) :'';

        //Email validate
            if(!Validator.isEmail(input.email)){
                error.email = 'Email is Invalid';
            }
            if(isEmpty(input.email)){
                error.email = 'Email is required'
            }
        //Password validate
            if(isEmpty(input.password)){
                errors.password = 'Password is valid';
            }

    }
    
    return {
        errors:errors,
        isValid:isEmpty(errors)
    }

}
module.exports = loginInputsValidate;