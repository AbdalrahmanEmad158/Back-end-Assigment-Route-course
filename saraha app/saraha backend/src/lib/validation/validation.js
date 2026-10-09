import { z } from "zod";
import { AppError } from "../../pkg/error/error.js";


export default function validateBody(dto,body){
  const result =   z.safeParse(dto,body)
  if (result.success == false) {
  const errMessages = result.error.issues.map(issue =>`${issue.path[0]} : ${issue.message}`)
  throw new AppError(errMessages.join(' , '),400)
  }
  return result.data
}