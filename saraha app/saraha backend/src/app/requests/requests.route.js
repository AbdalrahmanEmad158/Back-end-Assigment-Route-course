import { Router } from "express";
import * as RequestsController from "./controller/requests.controller.js";
import { authGuardMiddleWare } from "../../lib/auth/guard.js";

const requestsRouter = Router();

requestsRouter.post(
  "/:messageId",
  authGuardMiddleWare,
  RequestsController.createIdentityRequest,
);

requestsRouter.get(
  "/",
  authGuardMiddleWare,
  RequestsController.getAllIdentityRequests,
);

requestsRouter.patch(
  "/:requestId",
  authGuardMiddleWare,
  RequestsController.acceptIdentityRequest,
);

export default requestsRouter;