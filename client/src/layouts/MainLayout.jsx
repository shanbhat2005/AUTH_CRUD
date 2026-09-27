import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router'

const MainLayout = () => {

const {user,loading}= useContext(AuthContext)

if(loading){
  return <p>Loading...</p>
}

if(!user){
   return  <Navigate to="/" />
}

  return <Outlet/>
}

export default MainLayout
