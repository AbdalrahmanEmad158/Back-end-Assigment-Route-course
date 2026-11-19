import { noTokenProvided } from "../../app/auth/errors.js"
import { decodeToken } from "../../app/auth/utils/token.js"
import { tokenTypesEnums } from "../enums/tokenTypes.Enums.js"

export async function decodeRefreshMiddleWare(req,res,next)
{
    try {
        const refreshToken = req.cookies?.refresh_token || req.headers?.reftoken
      

  if (!refreshToken) {
           throw noTokenProvided 
    }

    const {data,JwtSecretKeyUse} = await decodeToken(refreshToken,tokenTypesEnums.REFRESH_TOKEN)

   
     req.refreshTokenDecodedData=data
     next()
    } catch (error) {
        next(error)
    }
}


    