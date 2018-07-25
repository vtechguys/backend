//Express Imports Router
const express = require('express');
const router = express.Router();

//Model
const Profile = require('../../model/Profile');


//profile validate inputs
const profileInputsValidate = require('../../validations/profileInputs');
const educationInputsValidate = require('../../validations/educationInputs');
const experienceInputsValidate = require('../../validations/experienceInputs');
const voteInputsValidate = require('../../validations/voteInputs');



const pick = require('../../utils/pick');

//passport imports
const passport = require('passport');

//Tesing Route

// @route   GET api/profile/test
// @desc    Tests Profile route
// @access  Public
router.get('/test',(req,res)=>{
    res.json({success:true, msg: "Working Profile"})
});


// @route   GET api/profile/
// @desc    GET User Profile 
// @access  Private
router.get('/',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    console.log("User requesting this is ",req.user.id);
    Profile.findOne({user: req.user.id})
        .populate('user',['name','email'])
        .then((profile)=>{
            const errors = {};
           if(!profile){
                console.log("Found no profile in then");
                errors.noMatchingProfile = 'Found No Matching Profiles';
                return res.json(errors);
           }
           else{
                res.json({ profile })
           }

        }).catch(errors=>{
            console.log("catched Errors",errors);
            res.json(errors);
        })
});
// @route   POST api/profile/
// @desc    POST to User Profile,make user profile 
// @access  Private
router.post('/',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    let body = pick(req.body,["userName","status","company","website","location","skills","social"]);
    console.log("Picked up ",body);
    const { errors, isValid } = profileInputsValidate(body);
    
    if(!isValid){
        console.log(`Errors in inputs ${errors}`);
        res.status(400).json(errors);
    }
    else{
        let newProfile = new Profile(body);
        let skills = newProfile.skills.toString();
        newProfile.user = req.user.id;
        newProfile.skills = skills.split(",");
        newProfile.save().then(()=>{
            res.json(newProfile);
        }).catch(err=>{
            console.log("Errors occured in saving Profile");
            res.json(newProfile);
        })
    }
});
// @route   POST api/profile/education
// @desc    POST to Profile education 
// @access  Private
router.post('/education',passport.authenticate('jwt',{ session: false }),(req, res)=>{
    const { errors, isValid } = educationInputsValidate(req.body);
  
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id }).then((profile)=>{
        console.log("Profile found is",profile);
        const { errors, isValid } = educationInputsValidate(req.body);

        if(!profile){
            console.log("No Matching profilefound");
            res.status(404).json({noMatchingProfile:'No Matching Profile'});
        }
        else{
            let newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            profile.education.unshift(newEdu);

            profile.save().then((profile)=>{
                res.json(profile);
            })
        }
    }).catch(err=>res.status(400).json({errors:'Errors'+err}))

});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = experienceInputsValidate(req.body);
  
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
  
        // Add to exp array
        profile.experience.unshift(newExp);
  
        profile.save().then(profile => res.json(profile));
      }).catch(err=>res.json({errors:{...err,errors}}))
    }
);

// @route   Patch api/profile/experience/exp_id
// @desc    Edit a experience to profile
// @access  Private
router.patch(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = experienceInputsValidate(req.body);
        console.log("validing experience inputs results",isValid)
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        const updatedExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        
        let editExpIndex = profile.experience.map(exp=>exp._id.toString()).indexOf(req.params.exp_id);
       

        profile.experience[editExpIndex] = updatedExp;

        // profile.update({user: req.user.id,'experience.$.id':req.params.exp_id},updatedExp,(err,profile)=>{
        //     if(err) throw err;
        //     res.json(profile);
        // })
  
         profile.save().then(profile => res.json(profile));

      }).catch(err=>res.json({errors:{...err,...errors}}))
    }
);
// @route   Patch api/profile/experience/exp_id
// @desc    Edit a experience to profile
// @access  Private
router.patch(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = educationInputsValidate(req.body);
        console.log("validing education inputs results",isValid)
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
  
      Profile.findOne({ user: req.user.id }).then(profile => {
        const updatedEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
        };
        
        let editEduIndex = profile.education.map(edu=>edu._id.toString()).indexOf(req.params.edu_id);
       
        console.log(editEduIndex);
        profile.education[editEduIndex] = updatedEdu;

        // profile.update({user: req.user.id,'experience.$.id':req.params.exp_id},updatedExp,(err,profile)=>{
        //     if(err) throw err;
        //     res.json(profile);
        // })
  
         profile.save().then(profile => res.json(profile));

      }).catch(err=>res.json({errors:{...err,...errors}}))
    }
);




// @route   DELETE api/profile/education/edu_id
// @desc    Add experience to profile
// @access  Private
router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      
      Profile.findOne({ user: req.user.id }).then(profile => {
        
        
        let deleteEduIndex = profile.education.map(edu=>edu._id.toString()).indexOf(req.params.edu_id);
       
        profile.education.splice(deleteEduIndex);
         profile.save().then(profile => res.json(profile));

      }).catch(err=>res.json({errors:{...err,...errors}}))
    }
);
// @route   DELETE api/profile/experience/exp_id
// @desc    Add experience to profile
// @access  Private
router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      
      Profile.findOne({ user: req.user.id }).then(profile => {
        
        
        let deleteExpIndex = profile.experience.map(exp=>exp._id.toString()).indexOf(req.params.exp_id);
       
        profile.education.splice(deleteExpIndex);
        profile.save().then(profile => res.json(profile));

      }).catch(err=>res.json({errors:{...err,...errors}}))
    }
);
// @route   DELETE api/profile/all
// @desc    DELETE PROFILE AND USER
// @access  Private

router.delete('/all',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    Profile.findOneAndRemove({user: req.user.id }).then(()=>{
        User.findOneAndRemove({user: req.user.id }).then(()=>{
            res.json({success: true});
        })
    }).catch(err=>res.json({errors:{...err}}))
});



router.post('/vote/:user_id',passport.authenticate('jwt',{ session: false }),(req,res)=>{
    let vote = pick(req.body,["vote"]);
    console.log("vote is ",vote)
    const { errors, isValid } = voteInputsValidate(vote);
    //upvote +1 true
    //novote default false 
    //downvote -1 false
    if(!isValid){
        console.log("Not valid vote ",errors);
        res.status(400).json(errors);
    }
    else{
                //voter must send Id of user whoes profile is to be liked
        //voter id is avialablethrough passport
        console.log("voting for ",req.params.user_id," by ",req.user.id);
        Profile.findOne({ user: req.params.user_id }).then(profile=>{
            if(!profile){
                console.log("Trying to vote for non existing user");
                res.status(404).json({status:false,noMatchingProfile:'no matching profile found'});
            }
            else{
                console.log("Voting for this profile ",profile);
                let array = profile.votedBy.map(oneVote => oneVote.user.toString());
                console.log("Array",typeof array," ",array);
                

                //check if voter already voted...
                // console.log(typeof req.params.user_id);
                // console.log(profile.votedBy.map(userVote =>{console.log(typeof userVote.user.toString(),userVote.user.toString());return userVote.user.toString()}));
                let voterIndex = profile.votedBy.map(userVote => userVote.user.toString())
                                    .indexOf(req.params.user_id);
                console.log(voterIndex);
                if(voterIndex>=0){
                    //voter already exist
                    let updateVote = {
                        user: req.user.id,//voter who req upvote
                        vote:vote.vote
                    };
                    profile.votedBy[voterIndex] = updateVote;
                    profile.save().then(()=>{
                        res.json({vote:`${vote.vote?'Liked':'Disliked'}`,voteChanged:true})
                    })
                }
                else{
                    //new vote on profile
                    console.log("Vote type is",typeof vote);
                    let newVote = {
                        user: req.user.id,//voter who req upvote
                        vote:vote.vote
                    };
                    profile.votedBy.unshift(newVote);
                    profile.save().then(()=>{
                        res.json({vote:`${vote.vote?'Liked':'Disliked'}`,newVoted:true})
                    })
                }



            }
        })
    }
    
});

module.exports = router;