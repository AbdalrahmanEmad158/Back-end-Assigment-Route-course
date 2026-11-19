 import {Router} from "express"


const appRouter = Router()
appRouter.use("/auth")
appRouter.use("/message")
appRouter.use("/user")
appRouter.use("/request")

export default appRouter