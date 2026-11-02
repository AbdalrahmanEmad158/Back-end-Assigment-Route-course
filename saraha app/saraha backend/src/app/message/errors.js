import { AppError } from "../../pkg/error/error.js";

export const noMessages = new AppError("you are not have any msg",404)
export const  messageNotFound = new AppError("Message not found",404)
export const  receiverNotFound = new AppError("Receiver not found", 404)
export const  invalidMessageId =  new AppError("Invalid message ID", 400)