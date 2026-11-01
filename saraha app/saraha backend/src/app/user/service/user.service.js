import fs from "node:fs";
import * as userRepo from "../repository/user.repository.js"

export async function uploadUserPic(user,file){
    const oldPicPath = user?.profilePicPath;
      await userRepo.updateUserByEmail(user.email,{profilePicPath:file.path})
   
        if (oldPicPath && fs.existsSync(oldPicPath)) {
            fs.unlinkSync(oldPicPath) 
        }
      
}


export async function uploadUserCv(user,file){
    const oldPicPath = user?.cvPath;
      await userRepo.updateUserByEmail(user.email,{cvPath:file.path})
   
        if (oldPicPath && fs.existsSync(oldPicPath)) {
            fs.unlinkSync(oldPicPath) 
        }
      
}