import { toMs } from "../../../pkg/utils/time.js"
import * as authServices from "../service/auth.service.js"
import * as authdto from "../dto/auth.dto.js"
import validateBody from "../../../lib/validation/validation.js"
import { setCookies } from "../utils/token.js"


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

export async function enableToStepVefication(req,res,next){
   try {
     
       const data = validateBody(authdto.enableTwoStepVerfication,req.body)
        const {email,code} = data
     const enableTwoStepVerfication = await authServices.enableTwoStepVerication(email,code)
     return res.status(200).json({
        success : true ,
        message : "user enable Two Step Verfication successful",
        user : enableTwoStepVerfication
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
     const  tokens = await authServices.logIn(email ,password)
     if (!tokens) {
      return res.json({ message: "check your inbox, we sent OTP", success: true });
     }
     console.log(tokens)
    setCookies(res,tokens.accessToken,tokens.refreshToken)

     return res.status(200).json({
        success : true ,
        message : "user login successful",
        accessToken : tokens.accessToken,
        refreshToken : tokens.refreshToken,
     })
   }
    catch (error) {
    next(error)
   }
}

export async function verifyCodeToLogin(req, res, next) {
  try {
    const data = validateBody(authdto.verifyCodeToLogin,req.body)
    const { email, code } = data
    const { accessToken, refreshToken } = await authServices.verifyCode2StepVerification(email, code);

    setCookies(res,accessToken,refreshToken)

    res.json({ message: "login successfully", success: true ,
     accessToken : accessToken,refreshToken : refreshToken
    });
  } catch (error) {
    next(error);
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
      const {accessToken,refreshToken} = await authServices.loginWithGoogle(idToken);
   
      setCookies(res,accessToken,refreshToken)


      res.status(200).json({message: "you are login with google successful", success: true,accessToken : accessToken, refreshToken : refreshToken});
    } catch (err) {
      next(err);
    }
   }


   export async function refreshToken(req,res,next){
    try {
      const refreshtoken = req.cookies?.refresh_token || req.headers?.reftoken
     
      const {accessToken,refreshToken} = await authServices.refreshToken(refreshtoken)

      setCookies(res,accessToken,refreshToken)

      return res.status(200).json({
        success : true ,
        message : "user refresh token successful",
        accessToken : accessToken,
        refreshToken : refreshToken,
       
     })
      
    } catch (error) {
      next(error)
    }
   }

    export async function logout(req,res,next){
      try {
    
        const logout= await authServices.logout(req.accessTokenDecodedData,req.refreshTokenDecodedData)
        res.clearCookie("access_token")
 
        res.clearCookie("refresh_token")
        res.status(200).json({
            success : true ,
        message : "user logout success",
        data : logout
        })
      } catch (error) {
        next(error)
      }
    }