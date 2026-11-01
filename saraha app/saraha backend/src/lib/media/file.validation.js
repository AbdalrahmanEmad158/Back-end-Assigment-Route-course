import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";
import {AppError} from "../../pkg/error/error.js"

export const fileValidation =(allowedTypes = ['image/png','image/jpeg'])=>
{
  
    return async (req, res, next) => {
  try {
    if (!req.file) {
        return next(new AppError("File is required", 400));
    }

    // get the file path
    const filePath = req.file.path;

    if (req.file.size > 5 * 1024 * 1024) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return next(new AppError("File size exceeds 5MB limit", 400));
    }
    // read the file and return buffer
    const buffer = fs.readFileSync(filePath);
    // get the file type
    const type = await fileTypeFromBuffer(buffer);
    // validate
   
    if (!type || !allowedTypes.includes(type.mime))
    {
        fs.unlinkSync(filePath)
      return next(new AppError("Invalid file type",400));
    }

    return next();
  } catch (error) {
    return next(error);
  }
}
}