import express from "express";

import {
  insertBookController,
  insertManyBooksController,
  updateFutureBookController,
  findBookByTitleController,
  findBooksBetweenYearsController,
  findBooksByGenreController,
  findBooksSkipLimitController,
  findBooksWithIntegerYearController,
  findBooksExcludeGenresController,
  deleteBooksBeforeYearController,
  aggregateBooksAfter2000Controller,
  aggregateBooksAfter2000ProjectionController,
  aggregateGenresController,
  aggregateBooksWithLogsController
} from "./books.controller.js";

const booksRouter = express.Router();


booksRouter.post("/", insertBookController);

booksRouter.post("/batch", insertManyBooksController);

booksRouter.patch("/Future", updateFutureBookController);

booksRouter.get("/title", findBookByTitleController);


booksRouter.get("/year", findBooksBetweenYearsController);


booksRouter.get("/genre", findBooksByGenreController);


booksRouter.get("/skip-limit", findBooksSkipLimitController);


booksRouter.get("/year-integer", findBooksWithIntegerYearController);


booksRouter.get("/exclude-genres", findBooksExcludeGenresController);


booksRouter.delete("/before-year", deleteBooksBeforeYearController);


booksRouter.get("/aggregate1", aggregateBooksAfter2000Controller);


booksRouter.get("/aggregate2",aggregateBooksAfter2000ProjectionController);


booksRouter.get("/aggregate3", aggregateGenresController);


booksRouter.get("/aggregate4",aggregateBooksWithLogsController);

export default booksRouter;