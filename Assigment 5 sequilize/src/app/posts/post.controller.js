import * as postService from "./post.service.js";

async function createPost(req, res, next) {
  try {
    const user = await postService.createPost(req.body);
    res.status(201).json({
      message: "post created successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function softDelete(req, res, next) {
  const id = Number(req.params.id);
  const userId = req.body?.userId;
  try {
    const user = await postService.softDelete(id, userId);
    res.status(200).json({
      message: "post deleted successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function getPostsDetails(req, res, next) {
  try {
    const posts = await postService.getPostsDetails();
    res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
}

async function getPostsWithCommentsCount(req, res, next) {
  try {
    const posts = await postService.getPostsWithCommentsCount();
    res.status(200).json({
      posts,
    });
  } catch (err) {
    next(err);
  }
}

export { createPost, softDelete, getPostsDetails, getPostsWithCommentsCount };