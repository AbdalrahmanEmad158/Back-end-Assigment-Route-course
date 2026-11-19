import { HydratedDocument, model, Schema } from "mongoose";
import { genderEnums, providerEnums, roleEnums } from "../../auth/enums/enums";
import { IUser } from "../iterfaces/user.interface";


export type userDocument = HydratedDocument<IUser>



const UserSchema = new Schema<IUser>({
    firstName : {
        type: String,
        required: [true, "First name is required"],
        minlength: 3,
     maxlength: [20, "First name cannot exceed 20 characters"],
        trim: true,
       
    },

      lastName : {
        type: String,
           required: [true, "Last name is required"],
        minlength: [3,"last name must be at least 3 character You entered ${VALUE}" ],
          maxlength: [20, "Last name cannot exceed 20 characters"],
        trim: true
    },

    email : {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        index :{name : "idx_email_unique" ,   unique: true},
            unique: true,
    },
    password : {
        type: String,
        required: function(this) {
            return this.provider===providerEnums.LOCAL;
        },
     
        trim: true
    },
    phone: {
      type: String,
      /*
      validate :{validator:function (params) {
        return regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      },
    message : {function(props){
        
    }}
    }
     */
         },

    provider : {
        type: Number,
       
        enum :providerEnums,
        default: providerEnums.LOCAL
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    dop :Date,
    gender: {
        type :  Number,
        enum : genderEnums,
        default : genderEnums.MALE

        /*
         type : Number,
        enum : Object.values(genderEnums),
        default : genderEnums.MALE
         */
    },
    role : {
        type : Number,
        enum : roleEnums,
          default : roleEnums.USER
    },
  /*

    age :{
      type : Number,
      min : [16 , "age must be at least 16"],
       max : [60 , "age must be less than 60"]
    },
    */

    isDeleted : {
        type: Boolean,
        default: false  
    },
    twoStepVerfication :{ 
        type: Boolean,
        default: false  },
    profilePicPath: String,
coverImagePaths: [String],
cvPath: String,

},

{
    timestamps: true,
     virtuals : {
        fullName :{get(this : IUser)
            {
               
                // return this.firstName + " " + this.lastName
                return `${this.firstName} ${this.lastName}`;
              
            }
        }
    },
    toJSON : {virtuals : true}, // من غيرها هتشتغل لاني برجع نت create : اوبجت تاني بياخد شويه حاجات من الاول 
    toObject :{virtuals : true},
  
   // strict : true, strictQuery : true, validateBeforeSave : true,   => by default
   //optimisticConcurrency : true
},
);



/*

userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});


userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });
*/

export const userModel = model<IUser>("User",UserSchema);