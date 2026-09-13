import {
  insertBook,
  insertManyBooks,
  updateFutureBook,
  findBookByTitle,
  findBooksBetweenYears,
  findBooksByGenre,
  findBooksSkipLimit,
  findBooksWithIntegerYear,
  findBooksExcludeGenres,
  deleteBooksBeforeYear,
  aggregateBooksAfter2000,
  aggregateBooksAfter2000Projection,
  aggregateGenres,
  aggregateBooksWithLogs
} from "./books.repository.js";

function validateBookData(book) {
         if (!book) {
    const err = new Error("Book data is required");
    err.statusCode = 400;
    throw err;
  }

  if (!book.title) {
    const err = new Error("title is required");
    err.statusCode = 400;
    throw err;
  }

  if (!book.author) {
    const err = new Error("author is required");
    err.statusCode = 400;
    throw err;
  }

  if (!book.year) {
    const err = new Error("year is required");
    err.statusCode = 400;
    throw err;
  }
  if (!book.genres || !Array.isArray(book.genres) || book.genres.length === 0) {
    const err = new Error("genres must be a non-empty array");
    err.statusCode = 400;
    throw err;
  }
  if (!Number.isInteger(book.year)) {
    const err = new Error("year must be an integer");
    err.statusCode = 400;
    throw err;
  }
}

export const insertBookService = async (book) => {

validateBookData(book)

  return await insertBook(book);
};


export const insertManyBooksService = async (books) => {

     if (!books) {
    const err = new Error("Books data is required");
    err.statusCode = 400;
    throw err;
  }

  if (!Array.isArray(books)) {
    const err = new Error("Books data must be an array");
    err.statusCode = 400;
    throw err;
  }

  if (books.length < 3) {
    const err = new Error("At least 3 books are required");
    err.statusCode = 400;
    throw err;
  }

  for (let book of books) {
    validateBookData(book);
  }


  return await insertManyBooks(books);
};


export const updateFutureBookService = async () => {

  const result = await updateFutureBook();


  if (result.matchedCount === 0) {
    const err = new Error("Book with title Future not found");
    err.statusCode = 404;
    throw err;
  }

  return result;
};


export const findBookByTitleService = async (title) => {

  if (!title) {
    const err = new Error("title is required");
    err.statusCode = 400;
    throw err;
  }

  const result = await findBookByTitle(title);

  if (!result) {
    const err = new Error("Book not found");
    err.statusCode = 404;
    throw err;
  }

  return result;
};


export const findBooksBetweenYearsService = async (from, to) => {
     if (Number.isNaN(from) || Number.isNaN(to)) {
    const err = new Error("from and to must be valid numbers");
    err.statusCode = 400;
    throw err;
  }

  if (from > to) {
    const err = new Error("from must be less than or equal to to");
    err.statusCode = 400;
    throw err;
  }
  return await findBooksBetweenYears(from, to);
};

export const findBooksByGenreService = async (genre) => {
     if (!genre) {
    const err = new Error("genre is required");
    err.statusCode = 400;
    throw err;
  }
  return await findBooksByGenre(genre);
};


export const findBooksSkipLimitService = async () => {
  return await findBooksSkipLimit();
};


export const findBooksWithIntegerYearService = async () => {
  return await findBooksWithIntegerYear();
};


export const findBooksExcludeGenresService = async () => {
  return await findBooksExcludeGenres();
};


export const deleteBooksBeforeYearService = async (year) => {

  if (Number.isNaN(year)) {
    const err = new Error("year must be a valid number");
    err.statusCode = 400;
    throw err;
  }
  return await deleteBooksBeforeYear(year);
};


export const aggregateBooksAfter2000Service = async () => {
  return await aggregateBooksAfter2000();
};


export const aggregateBooksAfter2000ProjectionService = async () => {
  return await aggregateBooksAfter2000Projection();
};


export const aggregateGenresService = async () => {
  return await aggregateGenres();
};


export const aggregateBooksWithLogsService = async () => {
  return await aggregateBooksWithLogs();
};