import { sendEmail } from "../../../lib/email/nodemailer.js";
import * as  userRepo from "../../user/repository/user.repository.js";
import * as  authRepo  from "../repository/auth.repository.js";
import * as  otpRepo  from "../repository/otp.repository.js";
import bcrypt from "bcrypt"           //hashing password
import crypto from "node:crypto"     //create Otp
import * as timeUtility from "../../../pkg/utils/time.js"
import * as userErrors from "../../user/errors.js"
import { invailedCreadintials, invalidCode, otpExpired ,noTokenProvided} from "../errors.js";

import {hash } from "../utils/hash.js";
import { compare } from "../utils/comparePassword.js";
import { encrypt } from "../../../lib/utils/encryption/encryption.js";

import { decodeToken, generateToken, verifyToken } from "../utils/token.js";
import envConfig from "../../../lib/config/env.config.js";
import { tokenTypesEnums } from "../../../lib/enums/tokenTypes.Enums.js";
import { OAuth2Client } from "google-auth-library";
import { AppError } from "../../../pkg/error/error.js";
import { calcTtl, redisDel, redisGet, redisSet, redisTtl } from "../../../lib/cacheRedis/redis.srvices.js";
export async function baseCodeToSendOtp(email,condition)
{
  const userExist =await authRepo.cheakUserExistByEMail(email)
  if (!userExist) {
    throw userErrors.userNotExist
  }

  if (condition) {
    condition(userExist)
  }
  //const deleteOtp = await otpRepo.deleteOtpByEmail(email)
await redisDel(`email_verificaton:${userExist.email}`)
   const OtpCode = crypto.randomInt(100000,999999).toString()
   const hashedOtp = await hash(OtpCode)
  await redisSet({ key: `email_verificaton:${userExist.email}`, value: hashedOtp, options: { EX:300 } })
 /*
   /*
   const createOtp =  await otpRepo.createOtp({
    code : OtpCode,
    email:email,
    expiresAt : new Date(Date.now()+ timeUtility.toMs("5","m") )
   })
     */

    await sendEmail(
    email,"رمز التحقق الخاص بحسابك في Ngl",`مرحباً بك! رمز التحقق الخاص بك هو: ${OtpCode}. هذا الرمز صال لمدة 5 دقائق.`,
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


export async function baseCodeToUseOtp(email,code,condition,factory)
{
  
  const user = await authRepo.cheakUserExistByEMail(email)
  if (!user) {
    throw  userErrors.userNotExist
  }
   if (condition) {
    await condition(user);
  }
  

/* 

const otpExist = await otpRepo.getOtpByEmail(email)
  if (!otpExist) {
   throw otpExpired
  }
   if (otpExist.code !=code) {
  throw invalidCode
  }
  */

  const hashedOtp= await redisGet(`email_verificaton:${email}`)
   if (!hashedOtp) {
   throw otpExpired
  }
  
  
  const match =await compare(code,hashedOtp)
   if (!match) {
  throw invalidCode
  }

 const result =await factory(user)
 //const userUpdate = await userRepo.updateByEmail(email,{isVerified:true})
 //const deleteOtp = await otpRepo.deleteOtpByEmail(email)
 const deleteOtp = await redisDel(`email_verificaton:${email}`)
 return result
}

export async function signUp (userData)
{
      if (!userData.email) {
       throw userErrors.emailIsRequired
   
    }

    const user = await authRepo.cheakUserExistByEMail(userData.email)
    if (user) {
         throw userErrors.userAlreadyExist
 
    }
   userData.password = await hash(userData.password)

   if (userData.phone) {
    userData.phone = encrypt(userData.phone)
   }

   const createUser = await authRepo.createUser(userData)
   if (!createUser) {
    throw userErrors.userNotCteated
       
   }
   //await otpRepo.deleteOtpByEmail(userData.email)
 await sendOtpVerify(createUser.email);
  return createUser;
  /*
   const createOtp =  await otpRepo.createOtp({
    code : OtpCode,
    email:userData.email,
    expiresAt : new Date(Date.now()+ timeUtility.toMs("5","m") )
   })
     */
 
   
 
return createUser
}
export async function sendOtpVerify (email)
{
  return await baseCodeToSendOtp(email,(userExist)=>{
    
  if (userExist.isVerified) {
    throw  userErrors.userAlreadyVerified
  }
  })
}
export async function sendOtp (email)
{
  return await baseCodeToSendOtp(email,(userExist)=>{
    
  if (!userExist.isVerified) {
    throw  userErrors.userNotVerified
  }
  })
}


export async function verifyAccount(email,code)
{
  return await baseCodeToUseOtp(email,code,
    (user)=>{ if (user.isVerified) {
  throw userErrors.userAlreadyVerified
  }},
  async()=>{  
    const userUpdated = await userRepo.updateUserVerifiedByEmail(email)
  return userUpdated})
    
}

export async function enableTwoStepVerication(email,code)
{
 return await baseCodeToUseOtp(email,code,
    (user)=>{ if (user.twoStepVerfication) {
   throw new AppError("user already enable to step verfication",400) 
  }
if (!user.isVerified)
{
  throw userErrors.userNotVerified
}},
  async()=>{
     const userUpdated = await userRepo.updateUserByEmail(email,{twoStepVerfication:true})
      return userUpdated
    })
}


export function getJwtSecrets(role) {
  if (role === "admin") {
    return {
      accessSecret: envConfig.JWT_ADMIN_SECRET,
      refreshSecret: envConfig.JWT_ADMIN_SECRET_REFRESH,
    };
  }
  return {
    accessSecret: envConfig.JWT_SECRET,
    refreshSecret: envConfig.JWT_USER_SECRET_REFRESH,
  };
}

export function generateAuthTokens(user) {
  const payload = {
    id: (user.id || user._id).toString(),
    email: user.email,
    name: user.name || user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
    role: user.role,
  };

  const { accessSecret, refreshSecret } = getJwtSecrets(payload.role);

  const accessToken = generateToken(
    payload,
    accessSecret,
    timeUtility.toSecounds(1, "h"),
    crypto.randomUUID()
  );

  const refreshToken = generateToken(
    payload,
    refreshSecret,
    timeUtility.toSecounds(7, "d"),
    crypto.randomUUID()
  );

  return { accessToken, refreshToken };
}

export async function logIn(email, password) {
  const attemptsKey = `login-triles:${email}`;

  let cashedTrails = await redisGet(attemptsKey);
  console.log(cashedTrails, "cashedTrails");
  if (cashedTrails !== null && Number(cashedTrails) <= 0) {
    const remainingTime = await redisTtl(attemptsKey);
    throw new AppError(`Too many login attempts. Try again in ${remainingTime > 0 ? remainingTime : 180} seconds`, 429);
  }

  const userExist = await authRepo.cheakUserExistByEMail(email);
  if (!userExist) {
    throw userErrors.userNotExist;
  }

  if (!userExist.isVerified) {
    throw userErrors.userNotVerified;
  }

  const match = await compare(password, userExist.password);
  if (!match) {
    let cashedTtl = await redisTtl(attemptsKey);
    const ttl = cashedTtl > 0 ? cashedTtl : timeUtility.toSecounds(3, "m");
    const current = cashedTrails !== null ? Number(cashedTrails) : 5;
    const remaining = current - 1;

    console.log("Remaining attempts:", remaining, "with TTL:", ttl);

    await redisSet({
      key: attemptsKey,
      value: remaining.toString(),
      options: { EX: ttl },
    });

    throw invailedCreadintials;
  }

  await redisDel(attemptsKey);

  if (userExist.twoStepVerfication) {
    await baseCodeToSendOtp(userExist.email);
    return;
  }

  await redisDel(`revoke_all_sessions_${userExist._id}`);
  return generateAuthTokens(userExist);
}

export async function verifyCode2StepVerification(email, code) {
  return await baseCodeToUseOtp(
    email,
    code,
    (user)=>{
       if (!user.isVerified) {
        throw userErrors.userNotVerified
      }

      if (!user.twoStepVerfication) {
        throw new AppError("you are disapled two step verification please enable it",400)
      }
    },
    async (user) => {
      await redisDel(`revoke_all_sessions_${user._id}`);
      return generateAuthTokens(user);
    }
  );
}

export async function resetPassword(email, code, newPassword) {
  if (!newPassword || typeof newPassword !== "string" || !newPassword.trim()) {
    throw new AppError("New password is required", 400);
  }

  return await baseCodeToUseOtp(
    email,
    code,
    (user) => {
      if (!user.isVerified) {
        throw userErrors.userNotVerified;
      }
    },
    async (user) => {
      if (user.password) {
        const isSame = await compare(newPassword, user.password);
        if (isSame) {
          throw new AppError("New password must be different from current password", 400);
        }
      }

      const hashedPassword = await hash(newPassword);
      const userUpdated = await userRepo.updateUserByEmail(email, { password: hashedPassword });

      await redisSet({
        key: `revoke_all_sessions_${user._id}`,
        value: "password_changed",
        options: { EX: 7 * 24 * 3600 }
      });

      return userUpdated;
    }
  );
}

async function verifyGoogleIdToken(idToken) {
    try {
    const clientId = process.env.clientid || process.env.GOOGLE_CLIENT_ID || "364647380391-d1ledlqkotgrdrp5rm8plc64482uqc98.apps.googleusercontent.com";
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: clientId,
    });
    return ticket.getPayload();
  } catch (error) {
    throw new AppError("Invalid Google ID token", 403);
  }
}

export async function loginWithGoogle(idToken) {
  const payload = await verifyGoogleIdToken(idToken);
  let user = await authRepo.cheakUserExistByEMail(payload.email);
  if (user && user.isDeleted) {
    throw userErrors.userNotExist;
  }
  if (!user) {
    const [firstName, ...rest] = (payload.name || "Google User").split(" ");
    const lastName = rest.join(" ") || "User";
    user = await authRepo.createUser({
      firstName,
      lastName,
      email: payload.email,
      isVerified: true,
      provider: "google",
      gender: payload.gender || "male",
      dop: payload.dob || null,
      phone: payload.phone || null,
    });
  }

  await redisDel(`revoke_all_sessions_${user._id}`);
  return generateAuthTokens(user);
}

export async function refreshToken(refreshtoken) {
  if (!refreshtoken) {
    throw noTokenProvided;
  }

  const { data, JwtSecretKeyUse } = await decodeToken(refreshtoken, tokenTypesEnums.REFRESH_TOKEN);

  const user = await userRepo.getUserById(data.id);
  if (!user || user.isDeleted || !user.isVerified) {
    throw userErrors.userNotExist;
  }

  verifyToken(refreshtoken, JwtSecretKeyUse);

  const remainingTtl = await calcTtl(data.exp);
  if (remainingTtl > 0) {
    await redisSet({
      key: `bl_${tokenTypesEnums.REFRESH_TOKEN}_${data.jti}`,
      value: data.jti,
      options: { EX: remainingTtl }
    });
  }

  return generateAuthTokens(user);
}

export async function logout(accessTokenData,refreshTokenData){
  const { exp: accessExpiration, jti: accessId } = accessTokenData;
const { exp: refreshExpiration, jti: refreshId } = refreshTokenData;
const acessTtl = await calcTtl(accessExpiration)
if (acessTtl>0) {
  await redisSet({key:`bl_access_token_${accessId}`, value:accessId, options :{EX:acessTtl}})
}
const refreshTtl = await calcTtl(refreshExpiration)
if (refreshTtl>0) {
  await redisSet({key:`bl_refresh_token_${refreshId}`, value:refreshId, options :{EX:refreshTtl}})
}

return true
}
