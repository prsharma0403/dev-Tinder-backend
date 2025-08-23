const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const User = require("../model/user");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const {
      password,
      firstname,
      lastname,
      email,
      gender,
      photoUrl,
      age,
      state,
      city,
      pincode,
      about,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstname,
      lastname,
      email,
      password: passwordHash,
      gender,
      photoUrl,
      age,
      state,
      city,
      pincode,
      about,
    });

    await user.save();
    res.send("User create Successfully");
  } catch (err) {
    res.status(400).send("ERROR!! " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      throw new Error("Invalid credential");
    }

    const isPasswordValid = await user.validatePassword(password);
    await user.save();
    if (isPasswordValid) {
      const token = await user.getJWT();
      console.log(token);

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user +"Login Successfully");
    } else {
      throw new Error("Invalid credential");
    }
  } catch (err) {
    res.status(400).send("ERROR!! " + err.message);
  }
});
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("LogOut Successful");
});
module.exports = authRouter;
