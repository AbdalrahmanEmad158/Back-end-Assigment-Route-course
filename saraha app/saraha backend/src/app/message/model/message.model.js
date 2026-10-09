import { model , Schema } from "mongoose";
const messageScehma = new Schema({
    content :
    {
        type : String,
        required : true ,
        minlength: 3,
        maxlength: 20,
        trim : true
    },
    reciver :{
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true

    },

       sender:{
        type : Schema.Types.ObjectId,
        ref : "User",
    },
    isDeleted :{
        type : Boolean,
        default : false
    }

},
{timestamps : true}
)

export const messageModel = model("Message",messageScehma)