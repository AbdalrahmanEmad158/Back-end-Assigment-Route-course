import { AppError } from "../../lib/error/error";

export const otpExpired = new AppError( 'OTP expired, please resend OTP', 404 );
export const invalidCode = new AppError( 'invalid code',400 );
export const invalidPassword = new AppError('invalid password', 403 );
export const noTokenProvided = new AppError('Token not provided', 401 );
export const twoStepNotEnabled = new AppError('Two step verification is not enabled, please enable it first', 400 );
export const samePassword = new AppError('New password must be different from current password', 400 );
export const maxLoginAttempts = new AppError('You reached max login attempts, try again later', 429 );
