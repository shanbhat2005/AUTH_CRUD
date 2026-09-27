import { useForm } from 'react-hook-form'
import useApi from '../api/axios'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'



export const useAuth=()=>{
    const { handleSubmit, reset, register, formState: { errors } } = useForm()
    const api = useApi()
    const navigate=useNavigate()
    const {setUser,setAccessToken}= useContext(AuthContext)


const handleRegister = async(data) => {
    await api.post("/auth/register",data)
    console.log(data);
    navigate("/")

    

}

const handleLogin = async(data) => {
    
    const response= await api.post("/auth/login",data)
    setUser(response.data.data.user)
    setAccessToken(response.data.data.accessToken)
    console.log(data);
    


}

return {
    handleSubmit, handleLogin,navigate, handleRegister, reset, register, errors
}
}