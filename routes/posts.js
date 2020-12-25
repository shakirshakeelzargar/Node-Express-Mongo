const router = require("express").Router();
const verify=require('./verifyToken');

router.get('/',verify,(req,res)=>{
    const dummyData={
        posts: [
            {
                author:"David",
                quote:"Dummy Quote1"
            },
            {
                author:"Abraham",
                quote:"Dummy Quote2"
            }
        ]
    }
    return res.json({requestingUser:req.user,posts:dummyData})
});



module.exports=router;