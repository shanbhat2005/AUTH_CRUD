import User from "../models/user.model.js"
import { generateTokens } from "../utils/auth.js"
import bcrypt from 'bcryptjs'
import cookieParser from "cookie-parser"

export const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body

        const existUser= await User.findOne({email})
        if(existUser){
            return res.status(400).json({
                message:"user already exist"
            })
        }
const hashedPassword = await bcrypt.hash(password,10)
        const user= await User.create({
            name,
            email,
            passwordHash:hashedPassword 
        })
        const {accessToken,refreshToken}= await generateTokens(user._id)

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true
        })
        await User.findByIdAndUpdate(user._id,{refreshToken})
        res.status(201).json({
            message:"User created successfully",
            data:{
                user:{
                    name:user.name,
                    email:user.email,
                    id:user._id
                },
                accessToken
            }
        })
    } catch (error) {
        res.status(500).json({
            message:"internal server error"
        })
    }
}