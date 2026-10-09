import {noTokenProvided} from "../../app/auth/errors.js"
import jwt from 'jsonwebtoken'
import envConfig from "../config/env.config.js"

export function guard(req,res,next)
{
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