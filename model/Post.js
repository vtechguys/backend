const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String,
        required:true,
        max:100
    },
    body:{
        type:String,
        required:true,
        max:300
    },
    author:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    },
    commnets:[{
        
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
          
    }],
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
    }]

});

module.exports = Post = mongoose.model('post',PostSchema);