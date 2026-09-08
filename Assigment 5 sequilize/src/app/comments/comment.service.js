import * as commentRepository from "./comment.repository.js";
import * as postRepository from "../posts/post.repository.js";
import * as userRepository from "../users/user.repository.js";
async function createManyComments(data) {
  if (!data || data.comments.length === 0) {
    const err = new Error("please add comments in body");
    err.statusCode = 400;
    throw err;
  }

  for (const comment of data.comments) {
    const post = await postRepository.findById(comment.postId);
    const user = await userRepository.findById(comment.userId);
    if (!user) {
        const err = new Error(`user with id ${comment.userId} not found`);  
        err.statusCode = 404;
        throw err;
    }
    if (!post) {
        const err = new Error(`post with id ${comment.postId} not found`);  
        err.statusCode = 404;
        throw err;
    }
  }

  return await commentRepository.createMany(data.comments);
}


async function updateContent(content, commentId, userId) {
     if (!content) {
    const err = new Error("please add content in body");
    err.statusCode = 400;
    throw err;
  }
  if (!userId) {
    const err = new Error("please add user id in body");
    err.statusCode = 400;
    throw err;
  }
  if (!commentId) {
    const err = new Error("please add comment id in params");
    err.statusCode = 400;
    throw err;
  }

    const comment = await commentRepository.findById(commentId);

    if (!comment) {
        const err = new Error(`comment not found`);
        err.statusCode = 404;
        throw err;
    }

 if (Number(comment.user.id) !== Number(userId)) {
    const err = new Error(`you are not authorized to update this comment`);
    err.statusCode = 403;
    throw err;
  }
     return await commentRepository.updateContent(content, commentId, userId);
}


async function findOrCreate(data) {
  if (!data.postId) {
    const err = new Error("please add post id in body");
    err.statusCode = 400;
    throw err;
  }
  if (!data.userId) {
    const err = new Error("please add user id in body");
    err.statusCode = 400;
    throw err;
  }
  if (!data.content) {
    const err = new Error("please add content in body");
    err.statusCode = 400;
    throw err;
  }
  const commentExist = await commentRepository.findComment(
    data.userId,
    data.postId,
    data.content,
  );

  if (!commentExist) {
    const newComment = await commentRepository.create(data);
    return {
      newComment,
      created: true,
    };
  }
  return {
    commentExist,
    created: false,
  };
}


async function findByWord(word) {
  if (!word) {
    const err = new Error("please add word in search query");
    err.statusCode = 400;
    throw err;
  }
  const comments = await commentRepository.findByWord(word);
  const commentsCount = comments.length;
  return {
    commentsCount,
    comments,
    
  };
}


async function getLatestComments(postId) {
  if (!postId) {
    const err = new Error("please add post id to params");
    err.statusCode = 400;
    throw err;
  }
  const postExist = await postRepository.findById(postId);
  console.log(postExist);
  if (!postExist) {
    const err = new Error("post id dose not exist");
    err.statusCode = 404;
    throw err;
  }
  return await commentRepository.getLatestComments(postId);
}


async function findById(id) {
  if (!id) {
    const err = new Error("please add comment id to params");
    err.statusCode = 400;
    throw err;
  }
  const commentExist = await commentRepository.findById(id);
  if (!commentExist) {
    const err = new Error("no comment found");
    err.statusCode = 404;
    throw err;
  }
  return commentExist;
}



export { createManyComments ,updateContent,findOrCreate,findByWord,getLatestComments,findById};