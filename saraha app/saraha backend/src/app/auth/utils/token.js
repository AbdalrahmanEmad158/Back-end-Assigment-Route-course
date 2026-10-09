import envConfiq from "../../../lib/config/env.config.js"
import  jwt from "jsonwebtoken";
import * as timeUtility  from "../../../pkg/utils/time.js"


export function generateToken(payload)
{
     const token = jwt.sign(
      payload,
      process.env.JWT_SECRET||envConfiq.JWT_SECRET,
      {expiresIn : timeUtility.toMs(24,"h")})
      return token
}  