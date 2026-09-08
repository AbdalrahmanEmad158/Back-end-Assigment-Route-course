import dotenv from "dotenv";
import express from "express";
import userRoutes from "./app/users/user.routes.js";
import postsRoutes from "./app/posts/post.routes.js";
import commentRoutes from "./app/comments/comment.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentRoutes);





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