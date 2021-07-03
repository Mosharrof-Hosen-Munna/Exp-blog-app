const User = require('../../Models/User')
const {body}= require('express-validator')

module.exports = [
    body('username')
        .not()
        .isEmpty().withMessage('Please Provide A Uniq Name')
        .isLength({min:3,max:20}).withMessage('Username must be 3 to 20 chars')
        .custom(async username =>{
          let user =await  User.findOne({username})
          if(user){
              return Promise.reject('Username Already Used')
          }
        })
        .trim(),
    body('email')
        .isEmail().withMessage('Please Enter A Valid Email')
        .custom(async email =>{
            let user = await User.findOne({email})
            if(user){
                return Promise.reject('Email Already Used')
            }
        })
        .normalizeEmail(),
    body('password')
        .not()
        .isEmpty().withMessage('Please Provide A Strong Password')
        .isLength({min:8}).withMessage('Password Must Be Getter then 7 Character')
        ,
    body('confirmPassword')
        .custom((confirmPass,{req})=>{
            if(confirmPass !== req.body.password){
                throw new Error('Password Does Not Matched')
            }
            return true
        })
]