console.log("starting the project");

const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
//const { adminauth,userauth } = require('../middlewares/auth');
const app = express();
const port = 8955;
const User = require("./model/user");
const { Error } = require("mongoose");
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
  try {
    console.log(req.body);
    validateSignUpData(req);
    const { password, firstname, lastname, email } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User create Successfully");
  } catch (err) {
    res.status(400).send("ERROR!! " + err.message);
  }
});
/**Login user */
app.post("/login", async (req, res) => {
  console.log("login");
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      throw new Error("Invalid credential");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    await user.save();
    if (isPasswordValid) {
      res.send("Login Successfully");
    } else {
      throw new Error("Invalid credential");
    }
  } catch (err) {
    res.status(400).send("ERROR!! " + err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  console.log(data);

  try {
    const ALLOWED_Updates = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "city",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_Updates.includes(k)
    );
    console.log(isUpdateAllowed);
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills cannot more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User delete Successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
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
