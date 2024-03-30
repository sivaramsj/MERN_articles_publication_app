const express=require('express');
const cors = require('cors');
const mongoose= require('mongoose');

//user modules
const PostRoutes=require('./routes/post');
const UserRoutes=require('./routes/user');
const auth = require('./middleware/auth');

const app =express();
const port= process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/blog')
    .then(()=>console.log("Connected to mongodb..."))
    .catch((err)=>console.log("Failed to connect to mongodb",err));


app.use(express.json());
app.use(cors());



app.use('/api/post',PostRoutes);
app.use('/api/user',UserRoutes);

// app.use('/',(req,res)=>{
//     res.send("Hello world");
// });


app.listen(port,()=>console.log(`server is listening at port ...${port}`))