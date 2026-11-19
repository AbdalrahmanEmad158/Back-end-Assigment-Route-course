import multer, { diskStorage } from "multer"
import {AppError} from "../../pkg/error/error.js"
import fs from "node:fs"


function malterUpload(allowedTypes,path){
    const fullDestinationPath = `uploads/${path}`;
if (!fs.existsSync(fullDestinationPath)) {
  fs.mkdirSync(fullDestinationPath, { recursive: true });
}

   return multer({
    
    fileFilter : function(req,file,cb){
        if (!allowedTypes?.includes(file.mimetype)) {
            return cb(new AppError("invalid File Format",400),false)
        } 
        cb(null,true)
    },
  
    storage : diskStorage({
    destination : `uploads/${path}`,
    filename:function(req,file,cb){
      
        cb(null,`${crypto.randomUUID()} ${file.originalname}`)
    }
})
})
}

export function UploadSingleFile(fieldName,path,allowedTypes = ['image/png','image/jpeg']){
    return malterUpload(allowedTypes,path).single(fieldName)
}

export function UploadArrayOfFile(fieldName,maxCount,allowedTypes =['image/png','image/jpeg']){
    return malterUpload(allowedTypes).array(fieldName,maxCount)
}

export function UploadFields(fields ,allowedTypes =['image/png','image/jpeg']){
    return malterUpload(allowedTypes).fields(fields)
}
    
    
