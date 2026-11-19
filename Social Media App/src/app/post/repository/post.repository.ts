import { AbstractRepository } from "../../../lib/db/abstract.repository";
import { IPost } from "../interface/post.interface";
import { postModel } from "../model/user.model";

class postRepository extends AbstractRepository<IPost> {
    constructor() {
        super(postModel);
    }

}
export default new postRepository();