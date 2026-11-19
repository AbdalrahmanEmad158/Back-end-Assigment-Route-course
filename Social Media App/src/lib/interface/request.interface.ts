import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../app/user/iterfaces/user.interface";

// reopen
declare module "express-serve-static-core" {
   interface Request {
    user?: Partial<IUser>&JwtPayload
  }
}