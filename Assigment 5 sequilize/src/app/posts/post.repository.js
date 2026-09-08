import prisma from "../../common/db/prisma.config.js";

const create = async (data) => {
  return await prisma.post.create({
    data: {
      content: data.content,
      title: data.title,
      userId: data.userId,
    },
  });
};

const softDelete = async (id, userId) => {
  return await prisma.post.update({
    data: {
      isDeleted: true,
    },
    where: {
      id,
      userId,
      isDeleted: false,
    },
  });
};

const findById = async (id) => {
  return await prisma.post.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
};

const getPostsDetails = async () => {
  return await prisma.post.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      title: true,
    
      user: {
        select: {
          id: true,
          name: true,
       
        },
      },
      comments: {
        select: {
             id: true,
          content: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
         
        },
      },
    },
  });
};

const getPostsWithCommentsCount = async () => {
  return await prisma.post.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      title: true,
    
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
};
export { create, softDelete, findById, getPostsDetails , getPostsWithCommentsCount};