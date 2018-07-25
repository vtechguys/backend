//Express Imports Router
const express = require('express');
const router = express.Router();
const passport = require('passport');


const pick = require('../../utils/pick');
//Post Model
const Post = require('../../model/Post');


//Post Inputs Validate
const postInputsValidate = require('../../validations/postInputs');


//routes

//Tesing Route

// @route   GET api/posts/test
// @desc    Tests Posts route
// @access  Public
router.get('/test',(req,res)=>{
    res.json({success:true,msg:"Working Users"})
});

// @route   GET api/posts/
// @desc    GET Posts route
// @access  Public
router.get('/',(req,res)=>{
    
    let postParams = pick(req.body,["start","end","sortby","order"]);
    
    let startLimit = req.query.from||0;
    let endLimit = req.query.to||10;

    startLimit = new Number(startLimit);
    console.log(typeof startLimit);
   
   
    let sortby = req.query.soryby||'date';
    let orderby = req.query.orderby|| -1;
    orderby = new Number(orderby);
    let sort = {};
    if(sortby.trim().length>0){
        sort[sortby] = orderby;
    }
    else{
        sort['date'] = -1;
    }
    
    console.log("Sorting by ",sort,"start-end limit",startLimit,endLimit);
    
   
    

    Post.find()
        .sort(sort)
        .limit(startLimit,endLimit)
        .then(posts=>{
            console.log(posts);
            res.send(posts);
        }).catch(err=>{
            console.log('Error in finding JSON');
            res.status(400).json({errors:{...err}});
        });


});

// @route   POST api/posts/
// @desc    Create a post
// @access  Public
router.post('/',passport.authenticate('jwt',{ session: false}),(req,res)=>{

    let postBody = pick(req.body,["title","body"]);
    const { errors, isValid } = postInputsValidate(postBody);

    if(!isValid){
        console.log("Not valid inputs",errors);
        res.status(400).json({errors:{...errors},success:false,status:'Not Valid Input Errors'});
    }
    else{
        console.log("author",req.user);
        let newPost = {
            title:postBody.title,
            body:postBody.body,
            user:req.user.id,
            author:`${req.user.firstName} ${req.user.lastName}` 
        }
        let post = new Post(newPost);
        post.save().then(()=>{
            console.log("saved a post");
            res.json({success:'Post successfully saved'});
        });
    }

});
module.exports = router;