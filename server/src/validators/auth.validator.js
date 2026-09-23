import {body,validationResult} from "express-validator"

export const registerValidator=[
    body('name')
    .exists().withMessage("name is required").bail()
    .isString().withMessage("name should be in string format").bail()
    .isLength({min:2,max:20}).withMessage("name should be between 2 to 20 characters"),
    body('email')
    .exists().withMessage("email is required")
    .isEmail().withMessage("invalid email format"),
    body('password')
    .exists().withMessage("password is required")
    .isLength({min:6}).withMessage("password should be atleast 6 characters long"),
    (req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid request"
            })
        }
        next()
    }


]