import prisma from "../../common/db/prisma.config.js";

const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    omit: {
      password: true,
    },
  });
};

const findById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      role: true,
       password: true,
    },
    
  });
};

const create = async (data) => {
  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.userName,
      password: data.password,
      role: data.role,
    },
     omit: {
      password: true,
    },
  });
};

const update = async (data, id) => {
  const result =  await prisma.user.update({
    data: {
      name: data.userName,
      email: data.email,
      role: data.role,
    },
    where: {
      id,
    },
    omit: {
      password: true,
    },
  });
  return result;
};

export { findByEmail, create, update, findById };