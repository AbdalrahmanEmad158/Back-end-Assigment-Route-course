import { userModel } from "../model/user.model.js";

export async function updateUserVerifiedByEmail(email)
{
    const user =await userModel.findOneAndUpdate({email},{$set : {isVerified : true}}
        ,{returnDocument :"after" , runValidators:true })
        return user
}

export async function updateUserByEmail(email,userData)
{
    const user =await userModel.findOneAndUpdate({email},userData
        ,{returnDocument :"after" , runValidators:true })
        return user
}

export async function getUserById(id)
{
 const user =   await userModel.findOne({_id: id,isDeleted : false})
 return user
}