
import { decrypt } from "../../../lib/utils/encryption/decryption.js"
import {userModel} from "../../user/model/user.model.js"

export async function cheakUserExistByEMail(email)
{
 const user =   await userModel.findOne({email})
 return user
}

export async function createUser(userData)
{
 const user =   await userModel.create(userData)

 const temp = user.toObject()
const userobj2 = {
   
    fullName : temp.fullName,
    email: temp.email,
    gender: temp.gender,
   
   
  };
  if (temp.phone) {
    userobj2.phone = decrypt(temp.phone)
  }
 
  return userobj2;
}
