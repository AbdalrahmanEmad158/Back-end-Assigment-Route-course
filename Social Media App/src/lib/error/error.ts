export class AppError extends Error{
    public statusCode:number
    public isOperational:boolean
  

    constructor(msg:string,statusCode:number,isOperational:boolean = true)
    {
        super(msg)
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this,this.constructor)
    }

}