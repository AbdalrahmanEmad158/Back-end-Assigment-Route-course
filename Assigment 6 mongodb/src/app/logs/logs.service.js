import { insertLog } from "./logs.repository.js";
import { findBookById } from "../books/books.repository.js";

export const insertLogService = async (log) => {
    if (!log) {
    const err = new Error("Log data is required");
    err.statusCode = 400;
    throw err;
  }
  if (!log.action) {
    const err = new Error("Log action is required");
    err.statusCode = 400;
    throw err;
  }
    if (!log.book_id) {
    const err = new Error("Log book ID is required");
    err.statusCode = 400;
    throw err;
  }

  const book = await findBookById(log.book_id);
  if (!book) {
    const err = new Error("Book not found");
    err.statusCode = 404;
    throw err;
  }
  return await insertLog(log);
};