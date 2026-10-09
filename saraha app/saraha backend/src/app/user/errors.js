import { AppError } from "../../pkg/error/error.js";

export const userNotExist = new AppError('User Not Exists.',404);
export const userAlreadyExist = new AppError('User Already Exists.',409);
export const userAlreadyVerified = new AppError('User Already Verified.',400);
export const userNotVerified = new AppError('user Not Verified please verify your account',403);
export const userNotCteated = new AppError('faild when create user',400)
export const emailIsRequired = new AppError('Email is required',400)