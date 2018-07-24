const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        required:true
    },
    company:{
        type:String,
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    skills:{
        type:[String],
        required: true
    },
    social:{
        youtube:{
            type:String
        },
        facebook:{
            type:String
        },
        twitter:{
            type:String
        },
        instagram:{
            type:String
        },
        stackoverflow:{
            type:String
        }
    },
    votedBy:[{
        user:{
            type: Schema.Types.ObjectId,
            required:true
        },
        vote:{
            type:Boolean,
            default:false,
            required:true
        }
    }],
    experience:[
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
    ]

});





module.exports = Profile = mongoose.model('profile',ProfileSchema);