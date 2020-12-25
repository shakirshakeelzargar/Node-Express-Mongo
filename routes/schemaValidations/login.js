const Joi=require("@hapi/joi");

const loginValidation=(data)=>{
    const validationSchema={
        email:Joi.string().required().min(6).email(),
        password:Joi.string().required().min(6)
    };

    constvalidationResults=Joi.validate(data,validationSchema);
    return constvalidationResults

}


module.exports.loginValidation=loginValidation