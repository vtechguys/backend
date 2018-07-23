const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

function signupInputs(input){
    const errors = {};
console.log("Recived SignUp inputs as ",input);

    input.name.first  = input.name.first ? input.name.first :'';
    input.name.last  = input.name.last ? input.name.last :'';
    input.email  = input.email ? input.email :'';
    input.password  = input.password ? input.password :'';
    input.confirmPassword = input.confirmPassword ? input.confirmPassword :'';
    input.dob  = input.dob ? input.dob :'';

//First Name
    if(!Validator.isLength(input.name.first,{ min:2, max:30 })){
        errors.firstName= 'First Name length to be min:2, max:30 ';
    }
    if(isEmpty(input.name.first)){
        errors.firstName = 'First name is Required';
    }
//Last Name
    if(!Validator.isLength(input.name.last,{ min:2, max:30 })){
        errors.lastName= 'Last Name length to be min:2, max:30 ';
    }
    
    if(isEmpty(input.name.last)){
        errors.lastName = 'Last name is Required';
    }
//Email 
    if(!Validator.isEmail(input.email)){
        errors.email= 'Email Invalid';
    }
    if(isEmpty(input.email)){
        errors.email = 'Email Field is Required';
    }
//Password
    if(!Validator.isLength(input.password,{ min:8, max:35 })){
        errors.password= 'Password length to be { min:8, max:35 }';
    }
    if(isEmpty(input.password)){
        errors.password = 'Password is Required';
    }
//ConfirmPassword
    if(!Validator.equals(input.password,input.confirmPassword)){
        errors.confirmPassword = 'Password and confirm passwordmust match';
    }
    if(isEmpty(input.confirmPassword)){
        errors.confirmPassword = 'confirmPassword is Required';
    }
//DOB validation later using monent js

console.log("Errors occured in singupimputs are",errors);
return {
    errors:errors,
    isValid:isEmpty(errors)
}


}
module.exports = signupInputs;