//Mongoose Imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const nameSchema = new Schema({
    first:{
        type:String
    },
    last:{
        type:String
    }
});
const UserSchema = new Schema({
    name:{
        type:nameSchema,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type: Date,
        required: true
    }
});




UserSchema.statics.findByEmail = function (email){
    console.log("Inside Find By Email")
    
    let User = this;

    return User.findOne({ email: email }).then(user=>{
        let response = {};
        if(!user){
            response = { status: false, user: null};
            return Promise.resolve(response);
        }

        response = { status: true, user:user};

        return Promise.reject();

    });
}

module.exports = User = mongoose.model('users', UserSchema);