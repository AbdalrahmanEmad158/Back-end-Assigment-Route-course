import { z } from 'zod';
import { Types ,isValidObjectId } from "mongoose";

export const sendMessageDto = z.object({
  content: z.string().trim().min(2).max(100),
  
  reciverId: z.string().trim().refine((val) => {
    return Types.ObjectId.isValid(val);
     //return isValidObjectId(val);
  })
});