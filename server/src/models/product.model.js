import mongoose from 'mongoose'

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    description:{
        type:String,
        required:true,
        minLength:15,
        maxLength:100,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0
    }
})

const productModel= mongoose.model("products",productSchema)
export default productModel