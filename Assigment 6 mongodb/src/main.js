import {cheakHealthConnectToDatabase} from "./common/db/mongodb.config.js";
import express from "express";
import collectionRouter from "./app/collections/collections.routes.js";
import booksRouter from "./app/books/books.routes.js";
import logsRouter from "./app/logs/logs.routes.js";
const app = express();
app.use(express.json());
cheakHealthConnectToDatabase()

app.use("/collection", collectionRouter);
app.use("/books", booksRouter);
app.use("/logs", logsRouter);

 app.use((req, res) => {
    res.status(404).json({
        message: "URL or method is not correct"
    })});

    app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({

        message: err.message,
        success:false,
        stack : err.stack
    });
});

app.listen(3000, () => {
  console.log("application is running on port 3000");
});