

const mongoose=require("mongoose");
const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user",
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore","rejected","accepted","intrested"],
            message:`{VALUES} is incorect status type`
        }
    }
},{
     timestamps:true,   
    })

connectionRequestSchema.index({fromUserId:1,toUserId:1}); 
connectionRequestSchema.pre("save",function(){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot sent request to yoour self")
    }
    next();
})

const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequest;