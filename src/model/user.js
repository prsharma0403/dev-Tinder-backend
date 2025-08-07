const mongoose = require("mongoose");
const vaidator=require("validator");
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
  gender:{type:String,validate(value){
    if(!["male","female","other"].includes(value)){
        throw new Error("Please  validate with the proper gender"+value)
    }
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
const User = mongoose.model("User", userSchema);
module.exports = User;
