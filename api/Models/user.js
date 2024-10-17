const mongoose =require("mongoose");
const UserShema=new mongoose.Schema({
    username:{type:String, required:true,min:4,unique:true},
    password:{type:String,required:true},
})
const UserModel=mongoose.model("User",UserShema)
module.exports=UserModel;