 import {Router} from "express"
 import * as msgController from "../message/controller/message.controller.js"
import { guard } from "../../lib/auth/guard.js"

const messageRouter = new Router
messageRouter.post("/",msgController.createMessage)
messageRouter.post("/public",/*guard()*/guard,msgController.createMessage)
messageRouter.get("/",guard,msgController.getMyMsg)
export default messageRouter