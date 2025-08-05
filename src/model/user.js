const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true, minLength:5,maxLength:50 },
  lastname: { type: String ,},
  state: { type: String ,},
  email: { type: String, required: true, index: true, unique: true ,trim: true,lowercase:true,},
  password: { type: String, required: true ,},
  age: { type: Number, min:18,},
  city: { type: String ,},
  pincode: { type: Number , },
  gender:{type:String,validate(value){
    if(!["male","female","other"].includes(value)){
        throw new Error("Please  validate with the proper gender")
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
