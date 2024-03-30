const express= require('express');
const router=express.Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {User} =require('../models/user');


// router.get('/',async(req,res)=>{
//     const users=await User.find();
//     if(!users)
//         return res.status(400).send("No users are available");
//     res.status(200).send(users);
// });


// router.get('/:id',async(req,res)=>{
//     const user=await User.findById(req.params.id);
//     if(!user)
//         return res.status(404).send("User with given Id is not found");
//     res.status(200).send(user);
// });


router.get('/',auth,async(req,res)=>{
    // console.log(req.user);
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).send(user);
});

router.post('/',async(req,res)=>{
    const {username , email ,password} =req.body;

    const userExists=await User.findOne({email});
    if(userExists)
        return res.status(400).send("User already exits");

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password,salt);
    

    const newUser=new User({
        username,
        email,
        password:hashed_password,
    });


    await newUser.save();

    const token = newUser.generateToken();
    res.header("x-auth-token",token).send("User is created Successfully");
});

router.put('/:id',async(req,res)=>{
    const id = req.params.id;
    const {username,email,password} = req.body;
    const UpdateUser =await User.findByIdAndUpdate(id,{
        username,
        email,
        password
    },{new:true});

    if(!UpdateUser)
        return res.status(400).send("User with Given Id is not found");

    res.status(200).send("User Upadated Successfully");
});


router.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    const DeleteUser =await User.findByIdAndDelete(id);
       

    if(!DeleteUser)
        return res.status(400).send("User with Given Id is not found");
    
    res.status(200).send("User Deleted Successfully");
});


//login
router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user = await User.findOne({email});
    if(!user)
        return res.status(400).send('Invalid Credentials');

    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid)
        return res.status(400).send('Invalid Credentials');

    const token = user.generateToken();
    res.send({"token":token});
});


module.exports = router;







