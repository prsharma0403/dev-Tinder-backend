console.log("starting the project")

const express = require('express');
const { adminauth,userauth } = require('../middlewares/auth');
const app = express()
const port = 8955;

app.get("/getUserData",(req,res)=>{
  try{
    throw new Error("djfhjsdhfh")
    res.send("User Data Sent")
  }
  catch (err){
    res.status(500).send("Contact support ");
  }
});
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

app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(500).send("Something went Wrorng");
  }
})
app.listen(port, () => {
  console.log(`Server is Successfully  listening on port ${port}`)
})
