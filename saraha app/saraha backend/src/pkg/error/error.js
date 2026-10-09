export class AppError extends Error{
    statusCode
    isOperational

    constructor(msg,statusCode,isOperational = true)
    {
        super(msg)
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this,this.constructor)
    }

}