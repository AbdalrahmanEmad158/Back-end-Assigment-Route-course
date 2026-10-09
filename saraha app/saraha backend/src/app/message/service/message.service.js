import { userNotExist } from "../../user/errors.js";
import * as userRepository from "../../user/repository/user.repository.js";
import * as msgRepository from "../repository/message.repository.js";
import * as msgErrors from "../errors.js";


export async function sendMessage(content,reciverId,senderId) {
    const userReciverExist = await userRepository.getUserById(reciverId)
    if(!userReciverExist)
    {
       throw userNotExist
    }
    const msg =await msgRepository.createMessage(content,reciverId,senderId)
    return msg

}


export async function getAllMyMsg(userId) {
    const userReciverExist = await userRepository.getUserById(userId)
    if(!userReciverExist)
    {
       throw userNotExist
    }
    const msgs =await msgRepository.getAllMsgByUserId(userId)
    if (msgs.length ===0) {
       throw msgErrors.noMessages
    }
    return msgs

}