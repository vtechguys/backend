//Express Imports Router
const express = require('express');
const router = express.Router();

//Lodash Imports Utils
const _ = require('lodash');
// bcrypt for hashing password
const bcrypt = require('bcryptjs');
// Mongoose




//Validaotors
const singUpInput = require('../../validations/signupInput');


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
    const { errors, isValid } = singUpInput(body);

    //check if form Inputs were valid if isValid==true valid form inputs => No erros occured erros isEmpty == true
    if(!isValid){
        //run if not valid form submition
        console.log("Invalid login Inputs ",errors);
        res.json(errors);
    }
    else
    {
        //All Inputs were valid

        User.findByEmail(body.email).then(response=>{
            
            if(!response.status && response.user !== null){
                console.log(`User was Found for Email ${body.email} SignUp is not possible`);
                res.json({status: `User with Email ${body.email} already exist`});
            }

            let newUser = new User(body);
            bcrypt.genSalt(60,(errors,salt)=>{
                //salt gen for 60 rounds
                bcrypt.hash(newUser.passwword, salt, (err, hash)=>{
                    //hashing paswword with salt
                    newUser.passwword = hash;
                    //hashed password 
                    //Saving user with hashed password
                    newUser.save().then(()=>{
                        console.log(`User Saving SignUp Sucesss`);
                    });
                })
            })

            

            res.json({status:'SignUp was Successfull'});



        }).catch(error=>{
            console.log(`User was Found for Email ${body.email} SignUp is not possible`);
            res.json({status: `User with Email ${body.email} already exist`,error: error});
        });
    }

    
});

// @route   GET api/users/login
// @desc    login users route
// @access  Public
router.post('/login',(req,res)=>{
    let body = _.pick(req.body,["name","email","password","confirmPassword","dob"]);
    res.json(body);
});




module.exports = router;