 import {Router} from "express"
 import * as msgController from "../message/controller/message.controller.js"
import { authGuardMiddleWare } from "../../lib/auth/guard.js"

const messageRouter = new Router
messageRouter.post("/",msgController.createMessage)
messageRouter.post("/public",/*guard()*/authGuardMiddleWare,msgController.createMessage)
messageRouter.get("/",authGuardMiddleWare,msgController.getMyMsg)

export default messageRouter