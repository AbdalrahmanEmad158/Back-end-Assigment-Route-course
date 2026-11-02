 import {Router} from "express"
import authRouter from "./app/auth/auth.route.js"
import messageRouter from "./app/message/message.route.js"
import userRouter from "./app/user/user.route.js"
import requestsRouter from "./app/requests/requests.route.js"
const appRouter = new Router
appRouter.use("/auth",authRouter)
appRouter.use("/message",messageRouter)
appRouter.use("/user",userRouter)
appRouter.use("/request",requestsRouter)

export default appRouter