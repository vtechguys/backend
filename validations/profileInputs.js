const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

function profileInputsValidate(inputs){
    const errors = {};
    console.log("Profile Inputs Recived ",inputs);
    //setting requirednptuts in format
        inputs.userName ? !isEmpty(inputs.userName):'';
        inputs.status ? !isEmpty(inputs.status):'';
        inputs.skills ? !isEmpty(inputs.skills):'';

    //UserName
        if(!Validator.isLength(inputs.userName,{ min: 6, max: 30 })){
            errors.userName = 'userName must be between 6 to 30 character long';
        }
        if(isEmpty(inputs.userName)){
            errors.userName = 'userName Field is required';
        }
    //Status
        if(!Validator.isLength(inputs.status,{min:2 , max: 80 })){
            errors.status = 'status must be between 2 to 80 character long';
        }
        if(isEmpty(inputs.status)){
            errors.status = 'Status Field is required';
        }
   
    //skills
       if(isEmpty(inputs.skills)){
            errors.skills = 'Skills Field is required';
        }
    //social
    if (!isEmpty(inputs.youtube)) {
        if (!Validator.isURL(inputs.youtube)) {
          errors.youtube = 'Not a valid URL';
        }
      }
    
      if (!isEmpty(inputs.twitter)) {
        if (!Validator.isURL(inputs.twitter)) {
          errors.twitter = 'Not a valid URL';
        }
      }
    
      if (!isEmpty(inputs.facebook)) {
        if (!Validator.isURL(inputs.facebook)) {
          errors.facebook = 'Not a valid URL';
        }
      }
    
      if (!isEmpty(inputs.linkedin)) {
        if (!Validator.isURL(inputs.linkedin)) {
          errors.linkedin = 'Not a valid URL';
        }
      }
    
      if (!isEmpty(inputs.instagram)) {
        if (!Validator.isURL(inputs.instagram)) {
          errors.instagram = 'Not a valid URL';
        }
      }         




    
console.log("Erros in profile inputs are",errors);

    return {
        errors,
        isValid:isEmpty(errors)
    }

}
module.exports = profileInputsValidate ;