import { useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

export const api= axios.create({
    baseURL: import.meta.env.VITE_API_URL || "/api",
    withCredentials:true,
   
})

const useApi=()=>{
    const accessToken= useContext(AuthContext).accessToken

    api.interceptors.request.use(
    (config)=>{
        if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
return Promise.reject(error)
    }
)
return api
}


 export default useApi