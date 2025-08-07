const mongoose = require('mongoose');


const url="mongodb+srv://practicenodeprashant:PKewyW38biVSBbP6@practicenodedb.fvrvrgx.mongodb.net/dev-Tinder-backend"

const connectDB=async()=>{
   await mongoose.connect(url);
}

module.exports=connectDB;


