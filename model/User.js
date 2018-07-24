//Mongoose Imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const bcrypt = require('bcryptjs');


const keys = require('../config/keys');


const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
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
    },
    tokens:[{
        access:{
            type:String,
            required:true

        },
        token:{
            type:String,
            required:true

        }
    }]
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

UserSchema.statics.findByCredentials = function(email, password){
    let User = this;

    return User.findOne({ email: email })
                .then(user=>{
                    if(!user){
                        console.log('No User Found');
                        return Promise.reject({noUserFound: 'No User Found'});
                    }
                    else
                        return new Promise((resolve,reject)=>{
                            bcrypt.compare(password, user.password,(err,isMatch)=>{
                                console.log("result is",isMatch);
                                if(isMatch){
                                    //resolving matched user
                                    resolve(user);
                                }
                                else{
                                    console.log("Rejecting Incorrect password");
                                    reject({passwordIncorrect: 'Password Incorrect'});
                                }
                            })
                        })

                })



}

UserSchema.pre('save',function(next){


    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10 ,(err, salt)=>{
            //salt gen for 10 rounds
    
            bcrypt.hash(user.password, salt, (err, hash)=>{
                //hashing paswword with salt
                console.log("Hash value is ",hash)
                user.password = hash;
                //hashed password 
                //Saving user with hashed pa..ssword
    
                //next call to middle ware
                next();//save will be called now
                
            })
        });
    }

});

module.exports = User = mongoose.model('users', UserSchema);