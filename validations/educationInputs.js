const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');



function educationInputsValidate(inputs){
    const errors ={};
    //Required fields setting
     inputs.school = !isEmpty(inputs.school) ? inputs.school :'';
     inputs.degree = !isEmpty(inputs.degree) ? inputs.degree :'';
     inputs.fieldofstudy = !isEmpty(inputs.fieldofstudy) ? inputs.fieldofstudy :'';
     inputs.from = !isEmpty(inputs.from) ? inputs.from :'';
 
    //School
     if(Validator.isEmpty(inputs.school)){
         errors.school = 'School Name is Required'
     }
     //Degree
     if(Validator.isEmpty(inputs.degree)){
         errors.degree = 'degree Filed is required'
     }
     //From
     if(Validator.isEmpty(inputs.from)){
         errors.from = 'From field is required'
     }
 
     return{
         errors,
         isValid:isEmpty(errors)
     }
}
module.exports = educationInputsValidate;