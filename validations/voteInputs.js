const isEmpty = require('../utils/isEmpty');

function voteInputsValidate(input){
    const errors = {};

    input.vote = !isEmpty(input.vote) ? input.vote :'';
    console.log(input.vote.toString(),"inside voteInputs");
    //validate if not empty srting
    
        if(typeof input.vote ==="boolean"){
            //vote is valid vote
            return { isValid:true }
        }
        else{
            errors.notValidVote = 'Vote must be a boolean true=>Liked,false=>Disliked'; 
        }
    
    
    return{
        errors,
        isValid:isEmpty(errors)
    }



}
module.exports = voteInputsValidate;