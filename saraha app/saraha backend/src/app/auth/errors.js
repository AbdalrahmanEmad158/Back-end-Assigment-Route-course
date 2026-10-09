import { AppError } from "../../pkg/error/error.js";

export const otpExpired = new AppError('OTP expired, please resend OTP',404);
export const invalidCode = new AppError('invalid code',400);
export const invailedCreadintials =new AppError('invailed email or password',403);
export const noTokenProvided =new AppError('No token provided',403);
