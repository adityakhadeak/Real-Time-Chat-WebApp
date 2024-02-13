import mongoose from "mongoose";

const ConnectToDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to Database Successfully')  
    } catch (error) {
        console.log(error)

    }
}
export default ConnectToDB