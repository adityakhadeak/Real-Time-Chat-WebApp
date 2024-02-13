import mongoose from "mongoose";

const messagesSchema= new mongoose.Schema({
    chatId:{
        type:String
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    }
},{
    timestamps:true
})

export default mongoose.model("Messages",messagesSchema)