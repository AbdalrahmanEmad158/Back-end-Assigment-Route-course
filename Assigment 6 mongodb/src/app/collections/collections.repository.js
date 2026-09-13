import { db } from "../../common/db/mongodb.config.js";

export const createBooksCollection = async () => {
   const result =  await db.createCollection("books",
     { validator :
        {$jsonSchema : {bsonType : "object", required:["title"],
            properties : {title : {bsonType :"string",minLength:1}}}}})
            console.log('result',result,"result");
            return result.toString();
};

export const createAuthorsCollection = async (authorData) => {
  return await db.collection("authors").insertOne(authorData);
};

export const createCappedLogsCollection = async () => {
  return await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024
  });
};

export const createBooksTitleIndex = async () => {
  return await db.collection("books").createIndex({
    title: 1
  });
};