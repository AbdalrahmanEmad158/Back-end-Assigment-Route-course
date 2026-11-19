import envConfig from "../../../lib/config/env.config.js";
import  jwt from "jsonwebtoken";
import { invalidCode, invalidToken ,noRoleProvided} from "../errors.js";
import { tokenTypesEnums } from "../../../lib/enums/tokenTypes.Enums.js";

import { redisGet, redisSet } from "../../../lib/cacheRedis/redis.srvices.js";
import { AppError } from "../../../pkg/error/error.js";
import * as timeUtility from "../../../pkg/utils/time.js"




export function generateToken(payload, jwtSecKeyUse = envConfig.JWT_SECRET, expiresIn = "1h",jwtid="")
{
     const secret = jwtSecKeyUse || envConfig.JWT_SECRET || process.env.JWT_SECRET;
     const token = jwt.sign(
      payload,
      secret,
      { expiresIn: expiresIn || "1h" ,jwtid :jwtid
        ,subject : payload.id
      })
      return token
}  


export function verifyToken(token,JWT_SECRET)
{
    try {
       const payload = jwt.verify(token,JWT_SECRET)
     return payload
    } catch (error) {
     throw invalidToken
    }
     
}  

export async function decodeToken(token,tokenType)
{
   
       const data = jwt.decode(token)
       console.log("datasa",data,"datasa")
    if (!data?.role) {
        throw noRoleProvided
    }
    else{
        const role = data.role
          let JwtSecretKeyUse=""
        if (role=="user") {
             
             if(tokenType ==tokenTypesEnums.ACCESS_TOKEN)
      {JwtSecretKeyUse = envConfig.JWT_SECRET}
        if(tokenType ==tokenTypesEnums.REFRESH_TOKEN)
      {JwtSecretKeyUse = envConfig.JWT_USER_SECRET_REFRESH}
        }

         if (role=="admin") {
     if(tokenType ==tokenTypesEnums.ACCESS_TOKEN)
      {JwtSecretKeyUse = envConfig.JWT_ADMIN_SECRET}
        if(tokenType ==tokenTypesEnums.REFRESH_TOKEN)
      {JwtSecretKeyUse = envConfig.JWT_ADMIN_SECRET_REFRESH}
    }


    const verifiedData = verifyToken(token, JwtSecretKeyUse);

     const blacklisted = await redisGet(`bl_${tokenType}_${data.jti}`);


     if (blacklisted) {

  if (tokenType === tokenTypesEnums.REFRESH_TOKEN) {
    await redisSet({
      key: `revoke_all_sessions_${data.id}`,
      value: "compromised",
      options: { EX: 7 * 24 * 3600 }
    });

    throw new AppError("Security alert: Session compromised, all sessions logged out", 401);
  }

  throw new AppError("token is revoked, you must login again", 401);
}
        return {data,JwtSecretKeyUse}
    }
   
}  


 function getJwtSecrets(role) {
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



export function setCookies(res,accessToken,refreshToken){
   res.cookie("access_token" ,accessToken,
      {
         httpOnly : true , //set or modify by backend http req only not by js Script code
         maxAge : timeUtility.toMs(1,"h")  // exoire in guardAuth directly 
      }
     )

     
       res.cookie("refresh_token" ,refreshToken,
      {
         httpOnly : true , //set or modify by backend http req only not by js Script code
         maxAge : timeUtility.toMs(7,"d")  // exoire in guardAuth directly 
        // ,path: "/api/auth/refresh-token",
      }
     )
}