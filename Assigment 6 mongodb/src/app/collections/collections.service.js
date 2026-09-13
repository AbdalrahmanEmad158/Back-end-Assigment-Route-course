import * as collectionsRepo from "./collections.repository.js";

export const createBooksCollection = async () => {
  return await collectionsRepo.createBooksCollection();
}; 

export const createAuthorsCollection = async (authorData) => {
    if (!authorData) {
    const err = new Error("request body must have data");
    err.statusCode = 400;
    throw err;
  }
  if (!authorData.name) {
    const err = new Error("name is required");
    err.statusCode = 400;
    throw err;
  }

  
  if (!authorData.nationality) {
    const err = new Error("nationality is required");
    err.statusCode = 400;
    throw err;
  }
  return await collectionsRepo.createAuthorsCollection(authorData);
};
  
export const createCappedLogsCollection = async () => {
  return await collectionsRepo.createCappedLogsCollection();
};

export const createBooksTitleIndex = async () => {
  return await collectionsRepo.createBooksTitleIndex();
};
