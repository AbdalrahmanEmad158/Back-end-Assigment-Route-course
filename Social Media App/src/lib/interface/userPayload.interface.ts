import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../app/user/iterfaces/user.interface";

export type TUserPayload = JwtPayload & Partial<IUser>