const mongoose=require('mongoose');
// const {User} =require('./user');

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // ref:User,        
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
});


const Post= mongoose.model('Post',postSchema);

exports.Post=Post;