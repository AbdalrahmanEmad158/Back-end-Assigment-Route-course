import {noTokenProvided} from "../../app/auth/errors.js"
import envConfig from "../config/env.config.js"
import { decodeToken, verifyToken } from "../../app/auth/utils/token.js"
import { getUserById } from "../../app/user/repository/user.repository.js"
import { userNotExist } from "../../app/user/errors.js"
import { tokenTypesEnums } from "../enums/tokenTypes.Enums.js"
import { redisGet } from "../cacheRedis/redis.srvices.js"
import { AppError } from "../../pkg/error/error.js"

export async function authGuardMiddleWare(req,res,next)
{
try {
  const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
   
    
     const token = req.cookies?.access_token || bearerToken   || req.headers?.token
   

 if (!token) {
throw noTokenProvided
 }

const {data,JwtSecretKeyUse} = await decodeToken(token,tokenTypesEnums.ACCESS_TOKEN)



const payload = verifyToken(token , JwtSecretKeyUse)

const isRevoked = await redisGet(`revoke_all_sessions_${payload.id}`);
if (isRevoked) {
 throw new AppError("Account locked for security reasons, please login again", 401);
}


const user =await getUserById(payload.id)
console.log(user)
 if (!user) {
 throw  userNotExist
 }
 req.user = user
 req.accessTokenDecodedData=data

next()
} catch (error) {
  next(error)
}

}

/*

import {noTokenProvided} from "../../app/auth/errors.js"

import envConfig from "../config/env.config.js"
import { verifyToken } from "../../app/auth/utils/token.js"
import { getUserById } from "../../app/user/repository/user.repository.js"
import { userNotExist } from "../../app/user/errors.js"

export async function authGuardMiddleWare(req,res,next)
{
   try {
     const token = req.cookies.access_token ||req.headers.token
    if (!token) {
        throw noTokenProvided
    }
    const [prefix,Token] = req.headers.Authorization.split(" ")
    
    const payload = verifyToken(token , envConfig.JWT_SECRET)
     const user =await getUserById(payload.id)
    if (!user) {
      throw  userNotExist
    }
    req.user = user
   
     next()
   } catch (error) {
    next(error)
   }

}
   
*/


/*

import {noTokenProvided} from "../../app/auth/errors.js"
import jwt from 'jsonwebtoken'
import envConfig from "../config/env.config.js"
import { verifyToken } from "../../app/auth/utils/token.js"
import { getUserById } from "../../app/user/repository/user.repository.js"
import { userNotExist } from "../../app/user/errors.js"

export async function authGuardMiddleWare(req,res,next)
{
   try {
 
      const token = /*req.cookies.access_token ||req.headers.token
    if (!token) {
        throw noTokenProvided
    }
    const payload = verifyToken(token , envConfig.JWT_SECRET)
    const user =await getUserById(payload.id)
    if (!user) {
      throw  userNotExist
    }
    req.user = payload
     next()
   } catch (error) {
    next(error)
   }

}
 */








/*

export function guard()
{
  return (req,res,next) =>{
      try {
     const token = req.cookies.access_token
    if (!token) {
        throw noTokenProvided
    }
    const payload = jwt.verify(token , envConfig.JWT_SECRET)
    req.user = payload
     next()
   } catch (error) {
    next(error)
   }
  }
 

}
  
*/