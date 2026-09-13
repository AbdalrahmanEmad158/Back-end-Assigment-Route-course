import {
  insertBookService,
  insertManyBooksService,
  updateFutureBookService,
  findBookByTitleService,
  findBooksBetweenYearsService,
  findBooksByGenreService,
  findBooksSkipLimitService,
  findBooksWithIntegerYearService,
  findBooksExcludeGenresService,
  deleteBooksBeforeYearService,
  aggregateBooksAfter2000Service,
  aggregateBooksAfter2000ProjectionService,
  aggregateGenresService,
  aggregateBooksWithLogsService
} from "./books.service.js";


export const insertBookController = async (req, res, next) => {
  try {
    const result = await insertBookService(req.body);

    res.status(201).json({
      message: "Book inserted successfully",
      result
    });
  } catch (error) {
    next(error);
  }
};


export const insertManyBooksController = async (req, res, next) => {
  try {
    const result = await insertManyBooksService(req.body);

    res.status(201).json({
      message: "Books inserted successfully",
      result
    });
  } catch (error) {
     next(error)
  }
};


export const updateFutureBookController = async (req, res, next) => {
  try {
    const result = await updateFutureBookService();

    res.json({
      message: "Future book updated successfully",
      result
    });
  } catch (error) {
     next(error)
  }
};


export const findBookByTitleController = async (req, res, next) => {
  try {
    const { title } = req.query;

    const result = await findBookByTitleService(title);

    res.json({
      result
    });
  } catch (error) {
     next(error)
  }
};


export const findBooksBetweenYearsController = async (req, res, next) => {
  try {
    const from = Number(req.query.from);
    const to = Number(req.query.to);

    const result = await findBooksBetweenYearsService(from, to);

    res.json({
      result
    });
  } catch (error) {
     next(error)
  }
};


export const findBooksByGenreController = async (req, res, next) => {
  try {
    const { genre } = req.query;

    const result = await findBooksByGenreService(genre);

    res.json({
      result
    });
  } catch (error) {
     next(error)
  }
};


export const findBooksSkipLimitController = async (req, res, next) => {
  try {
    const result = await findBooksSkipLimitService();

    res.json({
      result
    });
  } catch (error) {
    next(error)
  }
};


export const findBooksWithIntegerYearController = async (req, res, next) => {
  try {
    const result = await findBooksWithIntegerYearService();

    res.json({
      result
    });
  } catch (error) {
   next(error)
  }
};

export const findBooksExcludeGenresController = async (req, res, next) => {
  try {
    const result = await findBooksExcludeGenresService();

    res.json({
      result
    });
  } catch (error) {
      next(error)
  }
};


export const deleteBooksBeforeYearController = async (req, res, next) => {
  try {
    const year = Number(req.query.year);

    const result = await deleteBooksBeforeYearService(year);

    res.json({
      message: "Books deleted successfully",
      result
    });
  } catch (error) {
     next(error)
  }
};


export const aggregateBooksAfter2000Controller = async (req, res,next) => {
  try {
    const result = await aggregateBooksAfter2000Service();

    res.json({
      result
    });
  } catch (error) {
    next(error)
  }
};


export const aggregateBooksAfter2000ProjectionController = async (req,res,next) => {
  try {
    const result =
      await aggregateBooksAfter2000ProjectionService();

    res.json({
      result
    });
  } catch (error) {
     next(error)
  }
};


export const aggregateGenresController = async (req, res, next) => {
  try {
    const result = await aggregateGenresService();

    res.json({
      result
    });
  } catch (error) {
     next(error)
  }
};


export const aggregateBooksWithLogsController = async (req, res, next) => {
  try {
    const result = await aggregateBooksWithLogsService();

    res.json({
      result
    });
  } catch (error) {
     next(error)
  }
};