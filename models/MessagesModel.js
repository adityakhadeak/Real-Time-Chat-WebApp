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
})

export default mongoose.model("Messages",messagesSchema)