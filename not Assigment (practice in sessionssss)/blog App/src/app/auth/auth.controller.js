
const authService = require('./auth.service')
const register = async (req,res,next)=>{
 try {
       const{name , email , password} = req.body
   const createUser =  await authService.register(name,email,password)
   res.status(201).json({msg:'user created successful' , data:createUser})
 } catch (error) {
    next(error)
 }
}


const login =async (req,res,next)=>{
    try {

       const{email , password} = req.body
   const token =  await authService.logIn(email,password)
   res.status(201).json({msg:'user logIn successful' , data:token})
 } catch (error) {
    next(error)
 }
}


const forgotPass= (req,res)=>{}
const sendOtp = (req,res)=>{}
const logOut = (req,res)=>{}
module.exports = {register,login,forgotPass,sendOtp,logOut}