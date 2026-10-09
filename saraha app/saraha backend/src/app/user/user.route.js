 import {Router} from "express"
import { withCache } from "../../lib/cache/withCache.js"
import { toSecounds } from "../../pkg/utils/time.js"
import { userModel } from "./model/user.model.js"

const userRouter = new Router
userRouter.get('/getUsers',withCache(toSecounds(1,'d')), async (req,res)=>{
    const data =await userModel.find()
    res.json({data : data})
})
export default userRouter