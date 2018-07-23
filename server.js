//Dependencies Imports

//Express
const express = require('express');
//BodyParser
const bodyParser = require('body-parser');





//Built in Imports

//Routes Imports
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const mongoose = require('mongoose');


//Declartives.

//Express App 
const app = express();
//Port Of Node Js
const PORT = process.env.PORT || 5000;



//Middlewares

//Parse Http Url
app.use(bodyParser.urlencoded( {extended: false } ));
//Put every parsed url on req.body
app.use(bodyParser.json());

//Routes Config

//Matches every request from /api/user to users routes Imports
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/resume',posts);


//Db Config
const db = require('./config/keys').MONGO_URI;

//Db Connect 
mongoose.connect(db).then(()=>{console.log("MongoDB Connected")})
.catch((err)=>console.log("MongoDB Coonection failure ",err));






//Server run
app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`);
})