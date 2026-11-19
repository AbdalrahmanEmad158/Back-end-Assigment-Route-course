import { NextFunction,Request,Response } from "express";
import authService ,{AuthService} from "../service/auth.service";

class AuthController {
    private authService:AuthService=authService
    constructor() {
       // this.register = this.register.bind(this)
        
    }
     register= async(req:Request, res:Response,next:NextFunction) =>{
       try{
        const user = await this.authService.register(req.body)
        res.status(201).json({message:"user created successfully",user})
       }
       catch(err){
        next(err)
       }
        
    }
}
export default new AuthController()