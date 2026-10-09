
import { sendEmail } from "../../../lib/email/nodemailer.js";
import * as  userRepo from "../../user/repository/user.repository.js";
import * as  authRepo  from "../repository/auth.repository.js";
import * as  otpRepo  from "../repository/otp.repository.js";
import bcrypt from "bcrypt"           //hashing password
import crypto from "node:crypto"     //create Otp
import * as timeUtility from "../../../pkg/utils/time.js"
import * as userErrors from "../../user/errors.js"
import { invailedCreadintials, invalidCode, otpExpired } from "../errors.js";

import {hashPassword } from "../utils/hash.js";
import { comparePassword } from "../utils/comparePassword.js";
import { encrypt } from "../../../lib/utils/encryption/encryption.js";

import { generateToken } from "../utils/token.js";

export async function signUp (userData)
{
      if (!userData.email) {
       throw userErrors.emailIsRequired
   
    }

    const user = await authRepo.cheakUserExistByEMail(userData.email)
    if (user) {
         throw userErrors.userAlreadyExist
 
    }
   userData.password = await hashPassword(userData.password)

   if (userData.phone) {
    userData.phone = encrypt(userData.phone)
   }

   const createUser = await authRepo.createUser(userData)
   if (!createUser) {
    throw userErrors.userNotCteated
       
   }
   await otpRepo.deleteOtpByEmail(userData.email)
   const OtpCode = crypto.randomInt(100000,999999).toString()
   const createOtp =  await otpRepo.createOtp({
    code : OtpCode,
    email:userData.email,
    expiresAt : new Date(Date.now()+ timeUtility.toMs("5","m") )
   })
   
  await sendEmail(
    userData.email,"رمز التحقق الخاص بحسابك في Ngl",`مرحباً بك! رمز التحقق الخاص بك هو: 123. هذا الرمز صال لمدة 5 دقائق.`,
    `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #333;">مرحباً بك في Ngl</h2>
      <p>شكراً لتسجيلك معنا. استخدم رمز التحقق التالي لإكمال عملية التسجيل:</p>
      <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px; color: #007bff; border-radius: 5px; margin: 20px 0;">
        ${OtpCode}
      </div>
      <p style="color: #777; font-size: 12px;">هذا الرمز صالحة لمدة 5 دقائق فقط. إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بصفة آمنة.</p>
    </div>
    `
)
return createUser
}


export async function verifyAccount(email,code)
{
  const user = await authRepo.cheakUserExistByEMail(email)
  if (!user) {
    throw  userErrors.userNotExist
   
  }


  if (user.isVerified) {
  throw userErrors.userAlreadyVerified
  
  }
  const otpExist = await otpRepo.getOtpByEmail(email)
  if (!otpExist) {
   throw otpExpired
  
  }

   if (otpExist.code !=code) {
  throw invalidCode
  }
 const userUpdated = await userRepo.updateUserVerifiedByEmail(email)
 //const userUpdate = await userRepo.updateByEmail(email,{isVerified:true})
 const deleteOtp = await otpRepo.deleteOtpByEmail(email)
 return userUpdated
}


export async function logIn (email,password)
{
  const userExist =await authRepo.cheakUserExistByEMail(email)
  if (!userExist) {
   throw  userErrors.userNotExist
  
  }

  if (!userExist.isVerified) {
    throw userErrors.userNotVerified
   
  }


  const match =await comparePassword(password,userExist.password)

  if (!match) {
    throw  invailedCreadintials
  
  }

const  token = generateToken({id:userExist._id.toString(),email:userExist.email,name : userExist.fullName})
  return token
 
}


export async function sendOtp (email)
{
  const userExist =await authRepo.cheakUserExistByEMail(email)
  if (!userExist) {
    throw userErrors.userNotExist
  }

  if (!userExist.isVerified) {
    throw  userErrors.userNotVerified
  
  }
  const deleteOtp = await otpRepo.deleteOtpByEmail(email)

   const OtpCode = crypto.randomInt(100000,999999).toString()
   const createOtp =  await otpRepo.createOtp({
    code : OtpCode,
    email:email,
    expiresAt : new Date(Date.now()+ timeUtility.toMs("5","m") )
   })

    await sendEmail(
    email,"رمز التحقق الخاص بحسابك في Ngl",`مرحباً بك! رمز التحقق الخاص بك هو: 123. هذا الرمز صال لمدة 5 دقائق.`,
    `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #333;">مرحباً بك في Ngl</h2>
      <p>شكراً لتسجيلك معنا. استخدم رمز التحقق التالي لإكمال عملية التسجيل:</p>
      <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px; color: #007bff; border-radius: 5px; margin: 20px 0;">
        ${OtpCode}
      </div>
      <p style="color: #777; font-size: 12px;">هذا الرمز صالحة لمدة 5 دقائق فقط. إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بصفة آمنة.</p>
    </div>
    `)

}

export async function sendOtpVerify (email)
{
  const userExist =await authRepo.cheakUserExistByEMail(email)
  if (!userExist) {
    throw userErrors.userNotExist
  }

  const deleteOtp = await otpRepo.deleteOtpByEmail(email)

   const OtpCode = crypto.randomInt(100000,999999).toString()
   const createOtp =  await otpRepo.createOtp({
    code : OtpCode,
    email:email,
    expiresAt : new Date(Date.now()+ timeUtility.toMs("5","m") )
   })

    await sendEmail(
    email,"رمز التحقق الخاص بحسابك في Ngl",`مرحباً بك! رمز التحقق الخاص بك هو: 123. هذا الرمز صال لمدة 5 دقائق.`,
    `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #333;">مرحباً بك في Ngl</h2>
      <p>شكراً لتسجيلك معنا. استخدم رمز التحقق التالي لإكمال عملية التسجيل:</p>
      <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px; color: #007bff; border-radius: 5px; margin: 20px 0;">
        ${OtpCode}
      </div>
      <p style="color: #777; font-size: 12px;">هذا الرمز صالحة لمدة 5 دقائق فقط. إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بصفة آمنة.</p>
    </div>
    `)

}


export async function resetPassword(email,code,newPassword){

  const userExist = await authRepo.cheakUserExistByEMail(email)
if (!userExist) {
  throw userErrors.userNotExist
}

 if (!userExist.isVerified) {
    throw  userErrors.userNotVerified
  
  }

const otp =await otpRepo.getOtpByEmail(email)
if (!otp) {
  throw otpExpired
}

if (otp.code !=code) {
  throw invalidCode
}

const hashedPassword =await hashPassword(newPassword)
const user =await userRepo.updateUserByEmail(email,{password : hashedPassword})
await otpRepo.deleteOtpByEmail(email)
return user
}

 async function verifyGoogleIdToken(idToken) {
try{
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID");
 const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID",  // Specify the CLIENT_ID of the app that accesses the backend
   
})
return ticket.getPayload()
}
catch (error) {
throw new AppError("Invalid Google ID token",403);
}
}

export async function loginWithGoogle(idToken) { 
const payload = await verifyGoogleIdToken(idToken);
const user = authRepo.cheakUserExistByEMail(payload.email)
if (user) {
  return generateToken({id:user._id.toString(),email:user.email,name : user.fullName})

}
  const [firstName, lastName] = payload.name.split(" ");
const newUser = await authRepo.createUser({
  firstName,
  lastName,
  email: payload.email,
 
  isVerified: true,
  provider: "google",
  gender: payload.gender || "male",
  dop: payload.dob || null,
  phone: payload.phone || null,

})
  return generateToken({
    id: createdUser._id,
    email: createdUser.email,
    name: createdUser.fullName,
  })
}


