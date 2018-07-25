const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

function postInputsValidate(input){
    const errors = {};
    input.title = !isEmpty(input.title) ? input.title : '';
    input.body = !isEmpty(input.body) ? input.body : '';

    //Title validation is requried
    if(!Validator.isLength(input.title,{ min:2, max:100 })){
        errors.title = 'Title is minimum of length of 2 to 50';
    }
    if(Validator.isEmpty(input.title)){
        errors.title = 'Title is required';
    }

    //Body validation is required
    if(!Validator.isLength(input.body,{ min:2, max:360 })){
        errors.body = 'Body of minimum length 2 and max length 300';
    }
    if(Validator.isEmpty(input.body)){
        errors.body = 'Body is required';
    }
    
    if(!isEmpty(input.comment)){
        if(!Validator.isLength(input.comment.text,{ min:2, max:150 })){
            errors.body = 'Comment length of min 2 and max length 150';
        }
    }





    return{
        errors,
        isValid:isEmpty(errors)
    }

}
module.exports = postInputsValidate;