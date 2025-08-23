const express = require("express");
const userRouter = express.Router();
const { adminauth, userauth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionReqest");
const User=require("../model/user")
const USER_SAFE_DATA="firstname lastname photoUrl age gender about skills"
userRouter.get("/user/requests", userauth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionReqest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "intrested",
    }).populate("fromUserId", ["firstname", "lastname"]);
    res.json({ message: "Data sent sucessfully", data: connectionReqest });
  } catch (err) {
    req.statusCode(400).send("Error" + err.message);
  }
});
userRouter.get("/user/connections",userauth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},
            ],
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)
        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
  return row.toUserId;
            }
           return row.fromUserId;
       
    });
     res.json({data})}
    catch(err){
        res.status(400).send({message:err.message})
    }
})

userRouter.get("/feed",userauth,async(req,res)=>{
    try{
        //user should not see his own card 
        //ignored peple 
        //already connection
        //his conection
        const loggedInUser=req.user;
        const connectionReqests=await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}],
        }).select("fromUserId toUserId")
       
        const page=parseInt(req.params.page);
        const limit=parseInt(req.params.limit);
        const hideUserFromFeed= new Set();
        connectionReqests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        });
        const users=await User.find({
           $and:[ {_id:{$nin:Array.from(hideUserFromFeed)}},{_id:{$ne:loggedInUser._id}}],
        }).select(USER_SAFE_DATA).skip().limit(limit)
        res.send(users)

    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}) 
module.exports = userRouter;
