import { Router } from "express";
import * as postController from "./post.controller.js";

const postRoutes = Router();

postRoutes.post("/", postController.createPost);
postRoutes.delete("/:id", postController.softDelete);
postRoutes.get("/details" , postController.getPostsDetails)
postRoutes.get("/comments-count" , postController.getPostsWithCommentsCount)

export default postRoutes;