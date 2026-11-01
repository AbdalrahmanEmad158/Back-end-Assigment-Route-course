import * as userServices from "../service/user.service.js"
import { AppError } from "../../../pkg/error/error.js"

export async function uploadUserPic(req, res, next) {
    try {
        if (!req.file) {
            throw new AppError("Profile picture file is required", 400);
        }
        const user = req.user;
        await userServices.uploadUserPic(user, req.file);
        res.status(200).json({ message: 'upload profile picture successfuly', success: true });
    } catch (error) {
        next(error);
    }
}


export async function uploadUserCv(req, res, next) {
    try {
        if (!req.file) {
            throw new AppError("cv file is required", 400);
        }
     
        const user = req.user;
        await userServices.uploadUserCv(user, req.file);
        res.status(200).json({ message: 'upload your cv successfuly', success: true });
    } catch (error) {
        next(error);
    }
}