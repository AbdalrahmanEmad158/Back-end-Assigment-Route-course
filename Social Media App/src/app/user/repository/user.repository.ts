import { HydratedDocument } from "mongoose";
import { AbstractRepository } from "../../../lib/db/abstract.repository";
import { IUser } from "../iterfaces/user.interface";
import { userDocument, userModel } from "../model/user.model";

 export class UserRepository extends AbstractRepository<IUser> {
 
    constructor() {
        super(userModel);
    }
   
    async findByEmail(email: string): Promise< userDocument| null> {
        return userModel.findOne({ email });   
    }
}

export default new UserRepository();
