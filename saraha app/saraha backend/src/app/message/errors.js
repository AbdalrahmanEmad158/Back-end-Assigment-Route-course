import { AppError } from "../../pkg/error/error.js";

export const noMessages = new AppError("you are not have any msg",404)