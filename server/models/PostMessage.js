import mongoose from "mongoose";

const PostSchema=mongoose.Schema({
    title:String,
    name:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:{
        type:String,
        default:0
    },
    createdAt:{
        type:Date,
        default :new Date()
    },
    likes:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    }
});

const PostMessage=mongoose.model("PostMessage",PostSchema);
export default PostMessage;