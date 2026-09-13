import { ObjectId } from "mongodb";
import { db } from "../../common/db/mongodb.config.js";

const booksCollection = () => db.collection("books");

export const insertBook = async (book) => {
  return await booksCollection().insertOne(book);
};


export const insertManyBooks = async (books) => {
  return await booksCollection().insertMany(books);
};


export const updateFutureBook = async () => {
  return await booksCollection().updateOne(
    {
      title: "Future"
    },
    {
      $set: {
        year: 2022
      }
    }
  );
};


export const findBookByTitle = async (title) => {
  return await booksCollection().findOne({
    title
  });
};


export const findBooksBetweenYears = async (from, to) => {
  return await booksCollection()
    .find({
      year: {
        $gte: from,
        $lte: to
      }
    })
    .toArray();
};


export const findBooksByGenre = async (genre) => {
  return await booksCollection()
    .find({genres :{$elemMatch :{$eq:genre}}})
    .toArray();
};


export const findBooksSkipLimit = async () => {
  return await booksCollection()
    .find()
    .sort({
      year: -1
    })
    .skip(2)
    .limit(3)
    .toArray();
};


export const findBooksWithIntegerYear = async () => {
  return await booksCollection()
    .find({
      year: {
        $type: "int"
      }
    })
    .toArray();
};


export const findBooksExcludeGenres = async () => {
  return await booksCollection()
    .find({
      genres: {
        $nin: ["Horror", "Science Fiction"]
      }
    })
    .toArray();
};


export const deleteBooksBeforeYear = async (year) => {
  return await booksCollection().deleteMany({
    year: {
      $lt: year
    }
  });
};


export const aggregateBooksAfter2000 = async () => {
  return await booksCollection()
    .aggregate([
      {
        $match: {
          year: {
            $gt: 2000
          }
        }
      },
      {
        $sort: {
          year: -1
        }
      }
    ])
    .toArray();
};


export const aggregateBooksAfter2000Projection = async () => {
  return await booksCollection()
    .aggregate([
      {
        $match: {
          year: {
            $gt: 2000
          }
        }
      },
      {
        $project: {
          _id: 0,
          title: 1,
          author: 1,
          year: 1
        }
      }
    ])
    .toArray();
};


export const aggregateGenres = async () => {
  return await booksCollection()
    .aggregate([
      {
        $unwind: "$genres"
      }
    ])
    .toArray();
};


export const aggregateBooksWithLogs = async () => {
  return await booksCollection()
.aggregate([
  {
    $addFields: {
      bookIdString: { $toString: "$_id" } 
       }
  },
  {
    $lookup: {
      from: "logs",
      localField: "bookIdString",
      foreignField: "book_id",
      as: "logs"
    }
  }
]).toArray();
};


export const findBookById = async (id) => {
  return await booksCollection()
    .findOne({
      _id: ObjectId.createFromHexString(id)
    });
};