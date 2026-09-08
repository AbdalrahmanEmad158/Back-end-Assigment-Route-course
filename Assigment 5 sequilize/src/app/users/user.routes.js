import { Router } from "express";
import * as userControllers from"./user.controller.js"

const userRoutes = Router();

userRoutes.post("/signup", userControllers.signup);
userRoutes.put("/:id", userControllers.update);
userRoutes.get("/by-email", userControllers.findByEmail);
userRoutes.get("/:id", userControllers.findById);

export default userRoutes;