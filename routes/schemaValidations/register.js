const Joi=require("@hapi/joi");

const registerValidation=(data)=>{
    const validationSchema={
        name:Joi.string().required().min(6),
        email:Joi.string().required().min(6).email(),
        password:Joi.string().required().min(6)
    };

    constvalidationResults=Joi.validate(data,validationSchema);
    return constvalidationResults

}


module.exports.registerValidation=registerValidation