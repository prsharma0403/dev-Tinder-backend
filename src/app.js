console.log("starting the project");

const express = require("express");
const connectDB = require("./config/database");
//const { adminauth,userauth } = require('../middlewares/auth');
const app = express();
const port = 8955;
const User = require("./model/user");
connectDB()
  .then(() => {
    console.log("Database is connected now");
    app.listen(port, () => {
      console.log(`Server is Successfully  listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database Error");
  });
app.use(express.json());
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User create Successfully");
  } catch (err) {}
});
app.patch("/user",async(req,res)=>{
  const userId=req.body.userId;
  const data=req.body;
  console.log(data);
  try{
await User.findByIdAndUpdate({_id:userId},data,{
  returnDocument:"after"
})
res.send("User updated successfully");
  }catch(err){
    res.status(400).send("something went wrong");
  
  }
})
app.get("/feed",async (req, res) => {
  try {
    const users=await User.find({})
    res.send(users);

  } catch (err){
    res.status(400).send("something went wrong");
  }
});
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId)
    res.send("User delete Successfully");
  }catch(err){
    res.status(400).send("something went wrong");
  }
})
app.get("/user", async (req, res) => {
  const emailId = req.body.email;
  console.log(req.body);
  console.log(emailId);

  try {
    const users = await User.find({ email: emailId });

    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
connectDB()
  .then(() => {})
  .catch((err) => {});

/*app.get("/getUserData",(req,res)=>{
  try{
    throw new Error("djfhjsdhfh")
    res.send("User Data Sent")
  }
  catch (err){
    res.status(500).send("Contact support ");
  }
});*/
/*app.use("/admin",adminauth)
app.get("/admin/getAllData",(req,res)=>{
    
        res.send("All Data Sent")
})
app.get("/user",userauth,(req,res)=>{
    res.send("UserData is Created")
})
app.post("/user/login",(req,res)=>{
  res.send("user logged successfully")
})
app.get("/admin/deleteUserData",(req,res)=>{
    res.send("UserDeleted");
})*/

/*app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(500).send("Something went Wrorng");
  }
})*/
