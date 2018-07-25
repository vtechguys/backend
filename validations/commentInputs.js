const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

function commentInputsValidate(input){
    const errors = {};
    
    input.text = !isEmpty(input.text) ? input.text : ''
    if(!Validator.isLength(input.text,{ min:2, max:150 })){
        errors.text = 'Comment length of min 2 and max length 150';
    }
    if(Validator.isEmpty(input.text)){
        errors.text = 'Comment must have some text';
    }
    





    return{
        errors,
        isValid:isEmpty(errors)
    }

}
module.exports = commentInputsValidate;