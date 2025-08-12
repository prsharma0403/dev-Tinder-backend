const jwt=require('jsonwebtoken');
const User = require('../src/model/user');
const adminauth = (req, res, next) => {
  console.log("Admin auth is getting checked");
  const token = "xyz";
  const isAuthorisedToken = token === "xyz";
  if (!isAuthorisedToken) {
    res.status(401).send("Unauthorised request");
  } else {
    next();
  }
};
const userauth = async(req, res, next) => {
 /** read the token
  * validate the token
  * find the user
 */
try{
const {token}=req.cookies;
if(!token){
    throw new Error("Invalid credntial /token")

}
const decodedObj=await jwt.verify(token,"Dev@tinder123")
const{_id}=decodedObj
const user= await User.findById(_id)
if(!user){
    throw new Error("user not found")

}
req.user=user;
next()}
catch(err){
     res.status(400).send("ERROR:  "+ err.message);
}
};
module.exports = {
  adminauth,
  userauth,
};
