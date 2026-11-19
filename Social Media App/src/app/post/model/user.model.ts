import { IPost } from "../interface/post.interface";
import { Schema, model } from "mongoose";

const schema = new Schema<IPost>({
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 200
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    reactionsCount: {
        type: Number,
        default: 0
    },
    allowsComments: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const postModel = model<IPost>('Post', schema);