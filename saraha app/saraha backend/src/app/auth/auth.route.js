 import {Router} from "express"
 import * as authController from "./controller/auth.controller.js"
 import { invalidateCache } from "../../lib/cache/invalidateCache.js"
import idEmpotency from "../../lib/idEmpotency/idEmpotency.js"
import { toSecounds } from "../../pkg/utils/time.js"

const authRouter = new Router()
authRouter.post("/register",invalidateCache("GET:/api/user/getUsers"),authController.signUp )
authRouter.patch("/verify-account",authController.verifyAccounr )
authRouter.post("/login",authController.logIn )
authRouter.post("/send-otp",authController.sendOtp )
authRouter.post("/send-otp-verify",authController.sendOtpVerify )
authRouter.patch("/reset-password",idEmpotency(toSecounds(1,'d'))/*
,invalidateCache("GET:/api/user/getUsers")   مش هعملها لاني لما بعرض ال users اكييييد مش بعرض ال password*/
,authController.resetPassword)
authRouter.patch("/login-with-google",authController.loginWithGoogle)
export default authRouter