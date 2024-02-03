import UserModel from "../../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator";

const generateToken=(id)=>{
    const jwtKey= process.env.JWT_SECRET
    return jwt.sign({id},jwtKey,{expiresIn:('1d')})
}
const usercontroller=async(req,res)=>{
try {
    const {name,email,password}=req.body
    
    if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
    let user=await UserModel.findOne({email})
    if(user){
        return  res.status(400).json({
            message:"User with this email already exist"
        })
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            message:"Use a valid Email"
        })
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({
            message:"Use a strong Password"
        })
    }
    const salt = await bcrypt.genSalt(10)
    const encryptedPass= await bcrypt.hash(password,salt)
     user=new UserModel({name,email,password:encryptedPass})

    await user.save()
    const jsonToken=generateToken(user._id)
    res.status(200).json({
        message:"User registered Successfully",
        id:user._id,
        name,
        email,
        password,
        jsonToken
    })

} catch (error) {
    console.log(error)
    res.status(500).json({
        error
    })
}
}
export default usercontroller