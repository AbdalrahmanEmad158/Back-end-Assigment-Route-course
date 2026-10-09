import validateBody from "../../../lib/validation/validation.js"
import { sendMessageDto } from "../dto/msg.dto.js"
import * as msgServices from "../service/message.service.js"

export async function createMessage (req , res , next){
     try {
       const data =  validateBody(sendMessageDto,req.body)
       const {content,reciverId} = data
       const senderId = req?.user?.id
       const createdMsg = await msgServices.sendMessage(content,reciverId,senderId)
     res.status(201).json({message: "message created successfuly", success: true,data:createdMsg});
     } catch (error) {
    next(error)
     }
}


export async function getMyMsg (req , res , next){
     try {
       const MyMsgs = await msgServices.getAllMyMsg(req?.user?.id)
     res.status(201).json({success: true,data:MyMsgs});
     } catch (error) {
    next(error)
     }
}