import express from 'express'
import { loginValidator, registerValidator } from '../validators/auth.validator.js'
import { getMe, login, logout, refresh, register } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router= express.Router()
// register api
router.post("/register",registerValidator,register)
// login api
router.post("/login",loginValidator,login)
// refresh token api
router.post("/refresh",refresh)
router.post("/logout",logout)
// current logged in user api 
router.get("/me",authenticate,getMe)

export default router