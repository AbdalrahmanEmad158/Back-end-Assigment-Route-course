import express from "express";

import * as collectionsController from "./collections.controller.js";

const collectionRouter = express.Router();


collectionRouter.post(
  "/books",
  collectionsController.createBooksCollection
);


collectionRouter.post(    
  "/authors",
  collectionsController.createAuthorsCollection
);


collectionRouter.post(
  "/logs/capped",
  collectionsController.createCappedLogsCollection
);


collectionRouter.post(
  "/books/index",
  collectionsController.createBooksTitleIndex
);

export default collectionRouter;