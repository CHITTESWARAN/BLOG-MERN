const mongoose=require("mongoose");
const {Schema,model}=mongoose;
const PostSchema=new Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }, //the a in a to reference another document from User collecton to  the referencing document a post.
},{
    timestamps:true,
});
const PostModel=model('posts',PostSchema);
module.exports=PostModel;