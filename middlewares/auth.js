   const adminauth= (req,res,next)=>{
    console.log("Admin auth is getting checked")
    const token="xyz";
    const isAuthorisedToken=token==="xyz";
    if(!isAuthorisedToken){
        res.status(401).send("Unauthorised request")
  
    }
    else{
        next();
    }

}
const userauth= (req,res,next)=>{
    console.log("User is checked");
    const token="xyzgdfg";
    const isAuthorisedToken=token==="xyz";
    if(!isAuthorisedToken){
        res.status(401).send("Unauthorised request")
  
    }
    else{
        next();
    }

}
module.exports={
    adminauth,userauth
}