//import { logger } from "../../pkg/logger/logger.js";

import { AppError } from "./error";
import { Request, Response, NextFunction } from "express";

export function globalErrorHandler(err:AppError, req:Request, res:Response, next:NextFunction) {
    
    console.error("Error:", err);
 /*
    logger.error(err.message ,
        {
        stack : err.stack,
        correlationId : req.correlationId
    })
         */
    
    if (err.isOperational) {
       return  res.status(err.statusCode||500).json({
  
        message: err.message,
        success:false,
        stack : err.stack
    }); 
    }

    else {
        return res.status(500).json({
              message: "something went wrong",
        success:false,
         stack : err.stack
        })
    }

   
}


export function invalidRouteErrorHandler(req:Request, res:Response)  {
    res.status(404).json({
        message: "URL or method is not correct"
    })}