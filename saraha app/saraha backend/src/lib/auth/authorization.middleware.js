import {AppError} from '../../pkg/error/error.js'
export const  authorizationMiddleWare =(allowedRoles)=>{
    return (req,res,next)=>{
        const role = req?.user?.role
        if(!allowedRoles.includes(role))
        {
            throw new AppError("you donot have permission to access this resourse",403)
        }
        next()
    }
}