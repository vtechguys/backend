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
    
    
    let startLimit = req.query.from||0;
    let endLimit = req.query.to||10;

    startLimit = new Number(startLimit);
    endLimit = new Number(endLimit);

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
    
    //find params
    let findBy = {};
    req.query.userId ? (findBy['user']=req.query.userId) :'';
    req.query.username ? (findBy['author']=req.query.username) :'';





    console.log("Sorting by ",sort,"start-end limit",startLimit,endLimit,"find by",findBy,"<=");
    
   
    

    Post.find(findBy)
        .sort(sort)
        .limit(startLimit,endLimit)
        .then(posts=>{
            console.log(posts);
            res.send(posts);
        }).catch(err=>{
            console.log('Error in finding POST');
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


// @route   GET api/posts/:post_id
// @desc    GET a post by Id
// @access  Public

router.get('/:post_id',(req,res)=>{

    Post.findById(req.params.post_id).then((post)=>{
        console.log("Found a post for Id ",req.params.post_id,post);
        res.json(post);
    }).catch(err=>{res.status(404).json({success:false,errors:{...err}})});

});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
    '/:post_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.post_id)
          .then(post => {
            // Check for post owner
            if (post.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: 'User not authorized' });
            }
  
            // Delete
            post.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
      });
    }
  );





// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
    '/comment/:post_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
      }
  
      Post.findById(req.params.post_id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };
  
          // Add to comments array
          post.comments.unshift(newComment);
  
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
  );
  
  // @route   DELETE api/posts/comment/:id/:comment_id
  // @desc    Remove comment from post
  // @access  Private
  router.delete(
    '/comment/:post_id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Post.findById(req.params.post_id)
        .then(post => {
          // Check to see if comment exists
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotexists: 'Comment does not exist' });
          }
  
          // Get remove index
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
  
          // Splice comment out of array
          post.comments.splice(removeIndex, 1);
  
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
  );

module.exports = router;