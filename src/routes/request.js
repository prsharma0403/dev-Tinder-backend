const express=require("express");
const requestRouter=express.Router();
const { adminauth, userauth } = require("../middlewares/auth");
const ConnectionRequest=require("../model/connectionReqest");
const User = require("../model/user");
const { status } = require("express/lib/response");

requestRouter.post("/request/send/:status/:toUserId",userauth,async(req,res)=>{
try{

  const fromUserId=req.user._id;
  const toUserId=req.params.toUserId;
  const status=req.params.status;

const allowedStatus=["ignored","intrested"];


if(!allowedStatus.includes(status)){
  return res.status(400).send({message:"Invalid Status" })
}
const toUser=await User.findById(toUserId)
console.log(toUser);
if(!toUser){
  return res.status(404).json({message:"User not found"});

}
const existingConnectionRequest= await ConnectionRequest.findOne({
  $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}],
  fromUserId:fromUserId,toUserId:toUserId
})
if(existingConnectionRequest){
  return res.status(400).send({message:"Connection request already exist !!"})
}
  const connectionRequest=new ConnectionRequest({
    fromUserId,toUserId,status
  })
const data=await connectionRequest.save()
res.json({
  message:"Connection  Request send successfully",
  data,
})
}
catch (err) {
    res.status(400).send("ERROR!! " + err.message);
  }
})

requestRouter.post("/request/review/:status/:requestId",userauth,async(req,res)=>{
  
  try{
    const loggedInUser=req.user;
    const{status,requestId}=req.params
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:"Status not found"})
    }
    const connectionRequest=await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"intrested"
    })
    if(!connectionRequest){
      return res.status(400).json({message:"connection not found"})
    }
    connectionRequest.status=status;
const data=await connectionRequest.save();
 res.json({message:"connection save successfully !!",data})
  }
    catch (err) {
    res.status(400).send("ERROR!! " + err.message);
  }


})

module.exports=requestRouter;