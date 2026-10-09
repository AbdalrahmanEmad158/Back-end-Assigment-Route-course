import { messageModel } from "../model/message.model.js";

export async function createMessage(content , reciver ,sender ){
    return messageModel.create({content , reciver , sender})
}

export async function getAllMsgByUserId(userId){
    return messageModel.find({reciver : userId},{},{populate:{path :"reciver" ,select:"email"}})
}
