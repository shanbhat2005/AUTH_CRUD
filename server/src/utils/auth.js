import jwt from 'jsonwebtoken'
import config from "../config/config.js"

export const generateTokens=async(id)=>{
    const accessToken=  await jwt.sign({id},config.ACCESS_TOKEN,{expiresIn:"15m"})
    const refreshToken=  await jwt.sign({id},config.REFRESH_TOKEN,{expiresIn:"7d"})

    return{accessToken,refreshToken}
}

