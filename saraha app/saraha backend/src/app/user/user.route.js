import { Router } from "express"
import fs from "node:fs"
import { withCache } from "../../lib/cache/withCache.js"
import { toSecounds } from "../../pkg/utils/time.js"
import { userModel } from "./model/user.model.js"
import { UploadArrayOfFile, UploadSingleFile } from "../../lib/media/multer.js"
import { fileValidation } from "../../lib/media/file.validation.js"
import * as userRepo from "./repository/user.repository.js"
import * as usercontroller from "./controller/user.controller.js"
import { authGuardMiddleWare } from "../../lib/auth/guard.js"
import { authorizationMiddleWare } from "../../lib/auth/authorization.middleware.js"
import { roleEnums } from "../../lib/enums/role.enums.js"

const userRouter = new Router
userRouter.get('/getUsers', authGuardMiddleWare,authorizationMiddleWare([roleEnums.ADMIN]),withCache(toSecounds(1,'d')), async (req,res)=>{
    const data =await userModel.find().select("-password")
    res.json({data : data})
})

userRouter.patch('/upload-profile-pic',
    authGuardMiddleWare,
    authorizationMiddleWare([roleEnums.USER,roleEnums.ADMIN]),
    UploadSingleFile("pp","pic", ['image/png', 'image/jpeg']),
    fileValidation(['image/png', 'image/jpeg']),
    usercontroller.uploadUserPic,
  
)

userRouter.patch('/upload-cv',
    authGuardMiddleWare,
    UploadSingleFile("cv","cv",
        ['application/pdf','application/msword']),fileValidation(['application/pdf','application/msword']),
    usercontroller.uploadUserCv
)

userRouter.patch('/upload-gallery',authGuardMiddleWare, UploadArrayOfFile("gallery",3), (req, res, next) => {
  
    res.json('ok')
})

export default userRouter