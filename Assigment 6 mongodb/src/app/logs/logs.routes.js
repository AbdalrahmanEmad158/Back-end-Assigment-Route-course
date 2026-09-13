import express from "express";

import { insertLogController } from "./logs.controller.js";

const logsRouter = express.Router();


logsRouter.post("/", insertLogController);

export default logsRouter;