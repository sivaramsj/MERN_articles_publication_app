const jwt = require("jsonwebtoken");

function auth(req,res,next){
    const token = req.header("x-auth-token");
     console.log(token);
    if(!token)
        return res.status(401).send("UnAuthorized User");

    try{
        const decoded = jwt.decode(token,"SecretPrivateKey");
        req.user=decoded;
        next();
    }
    catch(ex){
        return res.status(400).send("Invalid Token");
    }

}

module.exports=auth;