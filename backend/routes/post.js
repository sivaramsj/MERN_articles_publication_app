const {Post}=require('../models/post');
const express= require('express');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/',async(req,res)=>{
    const posts=await Post.find().populate('author','username');
    res.status(200).send(posts);
});


router.get('/:id',async(req,res)=>{
    const post = await Post.findById(req.params.id).populate('author','username');
    if (!post)
        res.status(404).send("The post with given id is not found");
    res.status(200).send(post);
});

router.post('/',auth,async(req,res)=>{
    const {title,content,author}=req.body;
    const post = await new Post({title,content,author});
    await post.save();
    res.status(200).send(post);
});

router.put('/:id',auth,async(req,res)=>{
    let post = await Post.findById(req.params.id);
    if(!post)
        return res.status(404).send("Post with given id is not found");

    // console.log(req.body);
    post.title=req.body.title;
    post.content=req.body.content;

    await post.save();
    res.status(200).send(post);
});


router.delete('/:id',auth,async(req,res)=>{
    let post = await Post.findByIdAndDelete(req.params.id);
    if(!post)
        res.status(404).send("Post with given id is not found");
    res.status(200).send(post);
});

module.exports = router;

