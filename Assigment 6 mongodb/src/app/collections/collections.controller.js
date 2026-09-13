import * as collectionsServices from "./collections.service.js";

export const createBooksCollection = async (req, res,next) => {
  try {
    const result = await collectionsServices.createBooksCollection();
    

    res.status(201).json({
      message: "Books collection created successfully",
      ok: 1,
      result
    });
  } catch (error) {
  next(error)
  }
};

export const createAuthorsCollection = async (req, res,next) => {
  try {
    const result = await collectionsServices.createAuthorsCollection(req.body);

    res.status(201).json({
      message: "Author inserted successfully",
      result
    });
  } catch (error) {
  next(error)
  }
};

export const createCappedLogsCollection = async (req, res,next) => {
  try {
    const result = await collectionsServices.createCappedLogsCollection();

    res.status(201).json({
      message: "Capped logs collection created successfully",
      ok: 1,
    });
  } catch (error) {
  next(error)
  }
};

export const createBooksTitleIndex = async (req, res,next) => {
  try {
    const result = await collectionsServices.createBooksTitleIndex();

    res.status(201).json({
      message: "Index created successfully",
      result
    });
  } catch (error) {
  next(error)
  }
};