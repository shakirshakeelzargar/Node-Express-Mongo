const router = require("express").Router();
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken')

//Importing Models
const userModel=require("../models/user");

//Importing Validators
const {loginValidation}=require('./schemaValidations/login')





router.post('/login',async (req,res)=>{
    //Validaying input JSON Schema
    const {error}=loginValidation(req.body);
    if (error){
        return res.status(400).send(error);

    }

    //Checking if user already Exists in DB
    const user=await userModel.findOne({email:req.body.email});
    if(!user)return res.status(400).send({error:"Email/User does not Exist"});


    //Checking if password is valid
    const validPassword=await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send({error:"Invalid password"});




    //Creating a JWT
    const token=jwt.sign({email:user.email},process.env.JWT_SECRET)


    return res.header('Authorization',token).status(200).send({message:"Login Successful",token:token})
})


module.exports=router;