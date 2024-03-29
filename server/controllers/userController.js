import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator";

const generateToken = (id) => {
    const jwtKey = process.env.JWT_SECRET
    return jwt.sign({ id }, jwtKey, { expiresIn: ('1d') })
}

//Controller for User Registeration
const usercontroller = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Enter a valid Email"
            })
        }
        let user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User with this email already exist"
            })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                message: "Use a strong Password"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const encryptedPass = await bcrypt.hash(password, salt)
        user = new UserModel({ name, email, password: encryptedPass })

        await user.save()
        const jsonToken = generateToken(user._id)
        res.status(200).json({
            message: "User registered Successfully",
            id: user._id,
            name,
            email,
            jsonToken
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server Error",
            error
        })
    }
}

// Controller for User Login
const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body
        if(email==""||password=="")
        {
           return res.status(400).json({
            message:"All field are required..."
           }) 
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Enter valid Email..."
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "User not registered..."
            })
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)

        if (!isPassCorrect) {
            return res.status(400).json({
                message: "Incorrect Password..."
            })
        }
        const jsonToken = generateToken(user._id)
        res.status(200).json({
            message: "User Logged In Successfully",
            id: user._id,
            name: user.name,
            email,
            jsonToken
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}
//Controller for FindUsers
const findUsers=async(req,res)=>{
    try {
        let users=await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}
//Controller for GetUser
const getUser=async(req,res)=>{
    const userId=req.params.userId
    try {
        let user=await UserModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error,
            message:'Internal Server Error'
        })
    }
}
export { usercontroller, logincontroller,findUsers,getUser }