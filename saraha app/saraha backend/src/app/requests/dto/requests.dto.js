import { Types } from "mongoose";
import z from "zod";

export const createRequestDto = z.object({
  messageId: z.string().trim().refine((val) => {
    return Types.ObjectId.isValid(val);
  }, { message: "Invalid messageId ObjectId format" }),
});

export const acceptRequestDto = z.object({
  requestId: z.string().trim().refine((val) => {
    return Types.ObjectId.isValid(val);
  }, { message: "Invalid requestId ObjectId format" }),
});