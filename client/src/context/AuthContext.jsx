import { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";

export const AuthContext= createContext()

export const AuthProvider=({children})=>{
const [user, setUser] = useState(null)
const [accessToken, setAccessToken] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(() => {
    const restoreSession = async () => {
        try {
            const response = await api.post("/auth/refresh")
            setUser(response.data.data.user)
            setAccessToken(response.data.data.accessToken)
        } catch {
            setUser(null)
            setAccessToken(null)
        } finally {
            setLoading(false)
        }
    }

    restoreSession()
}, [])





return (
    <AuthContext.Provider value={{user,accessToken,setUser,setAccessToken,loading}} >
{children}
    </AuthContext.Provider>
)






}