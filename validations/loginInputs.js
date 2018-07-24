const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

function loginInputsValidate (input){
    
    const errors = {};
    console.log("loginInputs recived ",input);

    
    
        input.email ? !isEmpty(input.email) : '';
        input.password ? !isEmpty(input.password) :'';

        //Email validate
            if(!Validator.isEmail(input.email)){
                error.email = 'Email is Invalid';
            }
            if(Validator.isEmpty(input.email)){
                error.email = 'Email is required'
            }
        //Password validate
        console.log(input.password);
            if(Validator.isEmpty(input.password)){
                errors.password = 'Password is invalid';
            }

   
    
    return {
        errors:errors,
        isValid:isEmpty(errors)
    }

}
module.exports = loginInputsValidate;