const express=require("express");
const profileRouter=express.Router();
const User = require("../model/user")
const { adminauth, userauth } = require("../middlewares/auth")
const{validateProfileEdit}=require("../utils/validation")
profileRouter.get("/profile/view", userauth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
profileRouter.get("/profile", userauth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User doesnot exist");
    }
   
    res.send("user update suceesfull");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
profileRouter.patch("/profile/edit",userauth,async(req,res)=>{
  try{
   if(!validateProfileEdit(req)){
    throw new Error("Invalid edit")
   }
   const loginUser=req.user;
   console.log(loginUser);
 Object.keys(req.body).forEach((key)=>(loginUser[key]=req.body[key]))
  console.log(loginUser);
  await 
  loginUser.save()
  res.send("profile edit Successful")
  }catch(err){
res.status(400).send("something went wrong");
  }
})
module.exports=profileRouter;