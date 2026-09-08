import * as userRepository from "../users/user.repository.js";
import * as postRepository from "./post.repository.js";

async function createPost(data) {
  if (!data) {
    const err = new Error("request body must have data");
    err.statusCode = 400;
    throw err;
  }
  if (!data.userId) {
    const err = new Error("userId is required");
    err.statusCode = 400;
    throw err;
  }
  const userExist = await userRepository.findById(data.userId);
  if (!userExist) {
    const err = new Error("user dose not exist");
    err.statusCode = 404;
    throw err;
  }
  if (!data.content || !data.title) {
    const err = new Error("content and title is required");
    err.statusCode = 400;
    throw err;
  }

  return await postRepository.create(data);
}

async function softDelete(id, userId) {
  if (!id) {
    const err = new Error("post id is required in params");
    err.statusCode = 400;
    throw err;
  }
  if (!userId) {
    const err = new Error("user id is required in body");
    err.statusCode = 400;
    throw err;
  }

  const postExist = await postRepository.findById(id);
  if (!postExist) {
    const err = new Error("post not found");
    err.statusCode = 404;
    throw err;
  }
  if (postExist.userId !== Number(userId)) {
    const err = new Error("you are not authorized to delete this post.");
    err.statusCode = 403;
    throw err;
  }
  return await postRepository.softDelete(id, userId);
}

async function getPostsDetails() {
  return await postRepository.getPostsDetails();
}

async function getPostsWithCommentsCount() {
  const posts = await postRepository.getPostsWithCommentsCount();
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    commentsCount: post._count.comments,
  }));
}

export { createPost, softDelete, getPostsDetails , getPostsWithCommentsCount };