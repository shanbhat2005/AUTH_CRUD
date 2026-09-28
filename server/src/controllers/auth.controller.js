import { config } from "dotenv"
import User from "../models/user.model.js"
import { generateTokens, readRefreshToken } from "../utils/auth.js"
import bcrypt from 'bcryptjs'

// register controller
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
// login controller
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body

        const isUser=await User.findOne({email})

        if(!isUser){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const isPassword= await bcrypt.compare(password,isUser.passwordHash)
        if(!isPassword){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const {accessToken,refreshToken}= await generateTokens(isUser._id)
        await User.findByIdAndUpdate(isUser._id,{
            refreshToken
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true
        })
        
        res.status(200).json({
            message:"User logged in Successfully",
            data:{
                user:{
                    id:isUser._id,
                    name:isUser.name,
                    email:isUser.email,
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

// refresh token controller

export const refresh=async(req,res)=>{
  
        const refreshToken= req.cookies.refreshToken

        if(!refreshToken){
            return res.status(401).json({
                message:"refresh token is required"
            })
        }
try {
        const decode= await readRefreshToken(refreshToken)
        const {id}= decode
        const user = await User.findById(id)
        if(refreshToken!= user.refreshToken){
            await User.findByIdAndUpdate(id,{
                refreshToken:null
            })
            return res.status(401).json({
                message:"Refresh token mismatch"
            })
        }
        const {accessToken,refreshToken:newRefreshToken}= await generateTokens(id)
        await User.findByIdAndUpdate(id,{
            refreshToken:newRefreshToken
        })
        res.cookie("refreshToken",newRefreshToken,{
            httpOnly:true
        })

        res.status(200).json({
            message:"new tokens generated successfully",
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
    return res.status(401).json({
        message:"Invalid refresh token"
    })
}

    
}

export const logout=async(req,res)=>{
    try {
        const refreshToken=req.cookies.refreshToken

        if(refreshToken){
            await User.findOneAndUpdate(
                {refreshToken},
                {refreshToken:null}
            )
        }

        res.clearCookie("refreshToken")
        return res.status(200).json({
            message:"User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"internal server error"
        })
    }
}

export const getMe=async(req,res)=>{
    const {id}= req.user
    const user= await User.findById(id)
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }

    res.status(200).json({
        message:"User found successfully",
        data:{
            user:{
                id:user._id,
                name:user.name,
                email:user.email

            }
        }
    })

}