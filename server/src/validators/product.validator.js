import {body,validationResult} from 'express-validator'

const validateProduct=[
    body('name')
    .exists().withMessage("product name is required").bail()
    .isString().withMessage("product name must be a string").bail()
    .trim().isLength({min:1}).withMessage("product must contain at least 1 character").bail(),
    body("description")
    .exists().withMessage("description is required").bail()
    .isString().withMessage("description must be a string").bail()
    .trim().isLength({min:15}).withMessage("description must contain at least 15 characters").bail(),
    body("price")
    .exists().withMessage("price is required").bail()
    .isNumeric().withMessage("price must be a number").bail(),
    body("stock")
    .exists().withMessage("stock is required").bail()
    .isNumeric().withMessage("stock must be a number").bail(),
    (req,res,next)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"Invalid request",
                errors:errors.array()
            })
        }
        next()
    }

    
]

export default validateProduct