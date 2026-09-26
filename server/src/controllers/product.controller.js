import productModel from "../models/product.model.js"

export const createProduct=async(req,res)=>{
try {
    const {name,description,stock,price}= req.body

const product= await productModel.create({
    name,
    description,
    stock,
    price
})

res.status(201).json({
    message:"product created successfully",
    data:{
        product
    }
})
} catch (error) {
    return res.status(500).json({
        message:"internal server error",
        error
        
    })
}
}

export const getProducts=async(req,res)=>{
   try {
     const products= await productModel.find()

    res.status(200).json({
        message:"products fetched successfully",
        data:{
            products
        }
    })
   } catch (error) {
    return res.status(500).json({
        message:"internal server error",
        
    })
   }

}

export const getProduct=async(req,res)=>{
    try {
        const {id}=req.params

        const product= await productModel.findById(id)
        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }

        res.status(200).json({
            message:"product fetched successfully",
            data:{
                product
            }
        })
    } catch (error) {
         return res.status(500).json({
        message:"internal server error",
        error
    })
    }
}

export const updateProduct=async(req,res)=>{
    try {
        const {name,description,stock,price}= req.body
        const {id}= req.params
        const product= await productModel.findByIdAndUpdate(id,{
            name,
            description,
            stock,
            price
        },{new:true})

        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }

        res.status(200).json({
            message:"product updated successfully",
            data:{
                product
            }
        })
    } catch (error) {
            return res.status(500).json({
        message:"internal server error",
        error
    })
    }
}

export const deleteProduct=async(req,res)=>{
    try {
        const {id}= req.params

        const product= await productModel.findByIdAndDelete(id)

        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }

        res.status(200).json({
            message:"product deleted successfully",
            data:{
                product
            }
        })
    } catch (error) {
         return res.status(500).json({
        message:"internal server error",
        error
    })
    }
}