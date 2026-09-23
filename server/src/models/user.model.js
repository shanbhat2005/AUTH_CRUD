import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:2,
        max:20
    },
    email:{
        type:String,
        required:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,    
        lowercase:true,
        unique:true
        
    },
    passwordHash:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,

    }
})

const userModel= mongoose.model("User",userSchema)
export default userModel