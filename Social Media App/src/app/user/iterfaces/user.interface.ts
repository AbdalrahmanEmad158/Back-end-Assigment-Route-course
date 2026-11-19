import { Types } from "mongoose";
import { genderEnums, providerEnums, roleEnums } from "../../auth/enums/enums";

export interface IUser {
    _id?: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    provider?: providerEnums;
    isVerified?: boolean;
    dop?: Date;
    gender?: genderEnums;
    role?: roleEnums;
    isDeleted?: boolean;
    twoStepVerfication?: boolean;
    profilePicPath?: string;
    coverImagePaths?: string[];
    cvPath?: string;
}