const mongoose = require("mongoose");
const validator=require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, minLength:5,maxLength:50 },
  lastname: { type: String ,},
  state: { type: String ,},
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Your email validation logic here (e.g., regex check)
        return /^[^.\s@]+@[^.\s@]+\.[^.\s@]+$/.test(value);
      },
      message: 'Invalid email format'
    }
},
  password: { type: String, required: true ,},
  age: { type: Number, min:18,},
  city: { type: String ,},
  pincode: { type: Number , },
  gender:{type:String,enum:{
    values:["male","female","other"],
    message:`{VALUE} unsupported gender`
  }},
  photoUrl:{
    type:String,
  },
  about:{type:String,
    default:"This is the default about User!!!!",
  },
  skills:{type:[String],},
},
{timestamps:true,}
);
userSchema.methods.getJWT=async function(){
  const user = this;
    const token = await jwt.sign({ _id: user._id }, "Dev@tinder123",{expiresIn:"1d"});
     return token;   
}
userSchema.methods.validatePassword=async function(passwordInputByUser){
const user = this;
const passwordHash=user.password
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}
const User = mongoose.model("User", userSchema);
module.exports = User;
