//Express Imports Router
const express = require('express');
const router = express.Router();

//Lodash Imports Utils
const _ = require('lodash');
// bcrypt for hashing password
const bcrypt = require('bcryptjs');
// jwt tokens to user
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
// Mongoose




//Validaotors
const singUpInputsValidate = require('../../validations/signupInputs');
const loginInputsValidate = require('../../validations/loginInputs');


//User Model
const User = require('../../model/User');



//routes

//Tesing Route

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test',(req,res)=>{

    res.json({success:true,msg:"Working Users"})
});

// @route   GET api/users/signup
// @desc    signup users route
// @access  Public
router.post('/signup',(req,res)=>{
    let body = _.pick(req.body,["name","email","password","confirmPassword","dob"]);
    const { errors, isValid } = singUpInputsValidate(body);

    //check if form Inputs were valid if isValid==true valid form inputs => No erros occured erros isEmpty == true
    if(!isValid){
        //run if not valid form submition
        console.log("Invalid login Inputs ",errors);
        res.status(400).json(errors);
    }
    else
    {
        //All Inputs were valid

        User.findByEmail(body.email).then(response=>{
            
            if(!response.status && response.user !== null){
                console.log(`User was Found for Email ${body.email} SignUp is not possible`);
                res.status(404).json({status: `User with Email ${body.email} already exist`});
            }

            let newUser = new User(body);
           
            newUser.save().then(()=>{
                console.log(`User Saving SignUp Sucesss`);
                res.json({status:'SignUp was Successfull'});

            });
            

            



        }).catch(error=>{
            console.log(`User was Found for Email ${body.email} SignUp is not possible`);
            res.status(400).json(
                {
                    status: false,
                    errors: {
                        ...error,
                        userAlreadyExist: `User with email ${body.email} already exist`
                    }
                }
            );
        });
    }

    
});

// @route   GET api/users/login
// @desc    login users route
// @access  Public
router.post('/login',(req,res)=>{
    let body = _.pick(req.body,["name","email","password","confirmPassword","dob"]);
    const { errors, isValid } = loginInputsValidate(body);
    //check if loginInputs were valid
    if(!isValid){
        //when inputs not valid
        res.status(400).json(errors);
    }
    else{
        //valid inputs

        User.findByCredentials(body.email,body.password)
            .then(user=>{
                if(!user){
                    console.log('No user found SignUp please',user);
                    errors.noUserFound = `Error no user found for that Email ${email}`;
                    res.status(404).json({errors});
                }
                const payload = { 
                    id: user.id, 
                    name: user.name 
                }; // Creating JWT Payload

                // Sign Token
                jwt.sign(payload,keys.secretOrKey,{ expiresIn: 3600 },(err,token)=>{
                    console.log('inside jwt',user);
                    res.json({ token:token });
                })
                
            })
            .catch(err=>{
                console.log("Error in login ",err);
               
                res.status(400).json(err);
            });




    }
});




module.exports = router;