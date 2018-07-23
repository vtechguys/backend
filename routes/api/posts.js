//Express Imports Router
const express = require('express');
const router = express.Router();

//routes

//Tesing Route

// @route   GET api/posts/test
// @desc    Tests Posts route
// @access  Public
router.get('/test',(req,res)=>{
    res.json({success:true,msg:"Working Users"})
});



module.exports = router;