import { model, Schema } from "mongoose";
const otpSchema = new Schema({
   code :{
    type : String,
    required : true,
    length : 6
   },

     email :{
    type : String,
    required : true,
    lowerCase : true,
    trim : true
   },

   expiresAt : {
      type : Date ,
      required : true ,
      index : {expires :0}
   }
}
,
{
   timestamps : {
   createdAt : true,
   updatedAt : false
}
}
)
//otpSchema.index({createdAt : 1},{expireAfterSeconds:10*60})
export const Otp = model("Otp",otpSchema)