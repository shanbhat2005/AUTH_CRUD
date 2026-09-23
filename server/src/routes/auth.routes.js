import express from 'express'
import { registerValidator } from '../validators/auth.validator'
import { register } from '../controllers/auth.controller'

const router= express.Router()

router.post("/register",registerValidator,register)

export default router