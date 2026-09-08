import prisma from "../../common/db/prisma.config.js";

const createMany = async (comments) => {
  return await prisma.comment.createMany({
    data: comments,
  });
};



const updateContent = async (content, commentId, userId) => {
  return await prisma.comment.update({
  data: {
    content: content,
  },
  where: {
    id:commentId,
    userId: userId,
  },
  });
};


const findById = async (id) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    select: {
      id:true,
      content:true,
      createdAt:true,
      updatedAt:true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      post: {
        select: {
          id: true,
          title: true,
          content: true,
        },
      },
    },
  });
};


const findComment = async (userId, postId, content) => {
  return await prisma.comment.findFirst({
    where: {
      userId,
      postId,
      content,
    },
  });
};

const create = async (comment) => {
  return await prisma.comment.create({
    data: comment,
  });
};



const findByWord = async (word) => {
  return prisma.comment.findMany({
    where: {
      content: {
        contains: word,
        mode: "insensitive",
      },
    },
  });
};


const getLatestComments = async (postId) => {
  return await prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
};




export {
  createMany,
  updateContent,
  findById,
    findComment,
    create,
  findByWord,
  getLatestComments
};