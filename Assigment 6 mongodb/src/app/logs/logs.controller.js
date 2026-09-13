import { insertLogService } from "./logs.service.js";

export const insertLogController = async (req, res, next) => {
  try {
    const result = await insertLogService(req.body);

    res.status(201).json({
      message: "Log inserted successfully",
      result
    });
  } catch (error) {
   next(error);
  }
};