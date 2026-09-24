import { readAccessToken } from "../utils/auth.js"

export const authenticate=async(req,res,next)=>{
    const accessToken= req.headers.authorization.split(" ")[1]
    if(!accessToken){
        return res.status(400).json({
            message:"access token not found in request header"
        })
    }
    try {
        const decode= await readAccessToken(accessToken)
       req.user= decode
       next()
    } catch (error) {
        res.status(401).json({
            message:"invalid or expired access token"
        })
        
    }

}