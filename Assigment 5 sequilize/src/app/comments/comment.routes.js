import { Router } from "express";
import * as commentController from "./comment.controller.js";

const commentRoutes = Router();

commentRoutes.post("/", commentController.createManyComments);
commentRoutes.patch("/:commentId", commentController.updateContent);
commentRoutes.post("/find-or-create", commentController.getCommentOrCreate);
commentRoutes.get("/search", commentController.findByWord);
commentRoutes.get("/newest/:postId", commentController.getLatestComments);
commentRoutes.get("/details/:id", commentController.findById);

export default commentRoutes;