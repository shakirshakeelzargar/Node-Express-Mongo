const router = require("express").Router();
const bcrypt= require('bcryptjs');
const userModel=require("../models/user");

//Validation
const {registerValidation}=require('./schemaValidations/register')





router.post('/register',async (req,res)=>{
    //Validaying input JSON Schema
    const {error}=registerValidation(req.body);
    if (error){
        return res.status(400).send(error);

    }

    //Checking if user already Exists in DB
    const emailExists=await userModel.findOne({email:req.body.email});
    if(emailExists){
        return res.status(400).send({error:"Email Already Exists"});
    }

    //Hash the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    const user=new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    
    try{
        const savedUser=await user.save();
        return res.status(200).send(savedUser);
    }
    catch(err){
        return res.status(400).send(err);
}
})


module.exports=router;