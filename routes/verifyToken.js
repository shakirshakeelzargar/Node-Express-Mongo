const jwt=require('jsonwebtoken')

module.exports=function (req,res,next){
    const token=req.header('Authorization')
    if(!token) return res.status(401).send({error:"Unauthorized/Token Expired"})


    try{
        const verifiedToken=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verifiedToken;
        next();

    }
    catch(err){
        return res.status(401).send({error:"Invalid Token!",additional_details:err})

    }
} 