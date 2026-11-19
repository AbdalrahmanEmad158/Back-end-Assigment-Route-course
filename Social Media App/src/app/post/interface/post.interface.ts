import { Types } from "mongoose";

export interface IPost {
    content: string;
    userId: Types.ObjectId;
    commentsCount: number;
    reactionsCount: number;
    allowsComments: boolean;
}