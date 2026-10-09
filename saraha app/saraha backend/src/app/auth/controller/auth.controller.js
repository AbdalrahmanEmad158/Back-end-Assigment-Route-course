import { toMs } from "../../../pkg/utils/time.js"
import * as authServices from "../service/auth.service.js"
import * as authdto from "../dto/auth.dto.js"
import validateBody from "../../../lib/validation/validation.js"


export async function signUp(req,res,next){
   try {
      const data = validateBody(authdto.signupDto,req.body)
     const registerData = await authServices.signUp(data)
     return res.status(201).json({
        success : true ,
        message : "user created successful",
        user : registerData
     })
   } catch (error) {
    next(error)
   }
}


export async function verifyAccounr(req,res,next){
   try {
     
       const data = validateBody(authdto.verifyAccountDto,req.body)
        const {email,code} = data
     const verifiedData = await authServices.verifyAccount(email,code)
     return res.status(200).json({
        success : true ,
        message : "user verified successful",
        user : verifiedData
     })
   } catch (error) {
    next(error)
   }
}

export async function sendOtpVerify(req, res, next) {
  try {
   const data = validateBody(authdto.sendOtpDto,req.body)
    const {email} = data;
    await authServices.sendOtpVerify(email);
    res.status(200).json({message: "new otp sent,check user email", success: true});
  } catch (err) {
    next(err);
  }
}

export async function logIn(req,res,next){
   try {
      const data = validateBody(authdto.loginDto,req.body)
        const {email,password} = data
     const token = await authServices.logIn(email ,password)
     res.cookie("access_token" , token,
      {
         httpOnly : true , //set or modify by backend http req only not by js Script code
         maxAge : toMs(24,"h")
      }
     )
     return res.status(200).json({
        success : true ,
        message : "user login successful",
        token : token
     })
   }
    catch (error) {
    next(error)
   }
}


export async function sendOtp(req, res, next) {
  try {
   const data = validateBody(authdto.sendOtpDto,req.body)
    const {email} = data;
    await authServices.sendOtp(email);
    res.status(200).json({message: "new otp sent,check user email", success: true});
  } catch (err) {
    next(err);
  }
}



export async function resetPassword(req,res,next)
{
    try {
      const data = validateBody(authdto.resetPasswprdDto,req.body)
    const {email,code,newPassword} = data;
    await authServices.resetPassword(email,code,newPassword);
    res.status(200).json({message: "you are reset password successful", success: true});
  } catch (err) {
    next(err);
  }
}

export async function loginWithGoogle(req,res,next)
{
    try {
      const data = validateBody(authdto.loginWithGoogleDto,req.body)
      const {idToken} = data;
      const token = await authServices.loginWithGoogle(idToken);
      res.cookie("access_token" , token,
      {
         httpOnly : true , //set or modify by backend http req only not by js Script code
         maxAge : toMs(24,"h")
      }
     )
      res.status(200).json({message: "you are login with google successful", success: true,token : token});
    } catch (err) {
      next(err);
    }
   }