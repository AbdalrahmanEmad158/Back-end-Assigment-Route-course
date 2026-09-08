import * as userRepository from "./user.repository.js";
async function createUser(data) {
  if (!data) {
    const err = new Error("Request body is required");
    err.statusCode = 400;
    throw err;
  }

  const { email, userName, password, role } = data;

  if (!email || !userName || !password) {
    const err = new Error("Email, userName and password are required");
    err.statusCode = 400;
    throw err;
  }

  console.log(data);
  const userExist = await userRepository.findByEmail(email);

  if (userExist) {
      const err = new Error("Email already exists");
     err.statusCode = 409;

    throw err;
  }
if (role && role !== "user" && role !== "admin") {
    const err = new Error("Role must be either 'user' or 'admin'");
    err.statusCode = 400;
    throw err;
  }
  if(data.password.length <= 6){
    const err = new Error("Password must be at least 6 characters long");
    err.statusCode = 400;
    throw err;
  }

   if(data.userName.length <= 2){
    const err = new Error("Name must be at least 3 characters long");
    err.statusCode = 400;
    throw err;
  }
   if(data.email.includes("@") === false){
    const err = new Error("Email is not valid");
    err.statusCode = 400;
    throw err;
  }
  return await userRepository.create(data);
}




async function updateUser(data, id) {
  if (!data) {
    const err = new Error("Request body is required");
    err.statusCode = 400;
    throw err;
  }
  const userExist = await userRepository.findById(id);
  if (!userExist) {
  return await createUser(data);
  }

   const emailExist = await userRepository.findByEmail(data.email);

  if (emailExist && emailExist.id !== id) {
      const err = new Error("Email already exists");
     err.statusCode = 409;
    throw err;
  }

  if (data.role && data.role !== "user" && data.role !== "admin") {
    const err = new Error("Role must be either 'user' or 'admin'");
    err.statusCode = 400;
    throw err;
  }
  if(data.password.length <= 6){
    const err = new Error("Password must be at least 6 characters long");
    err.statusCode = 400;
    throw err;
  }

   if(data.userName.length <= 2){
    const err = new Error("Name must be at least 3 characters long");
    err.statusCode = 400;
    throw err;
  }
   if(data.email.includes("@") === false){
    const err = new Error("Email is not valid");
    err.statusCode = 400;
    throw err;
  }
  return await userRepository.update(data, id);
}

async function findByEmail(email) {
  if (!email) {
    const err = new Error("please enter email in query");
    err.statusCode = 400;
    throw err;
  }
  const userExist = await userRepository.findByEmail(email);
  if (!userExist) {
    const err = new Error("no user found with this email");
    err.statusCode = 404;
    throw err;
  }
  return userExist;
}

async function findById(id) {
   if (!id) {
    const err = new Error("please enter id in params");
    err.statusCode = 400;
    throw err;
  }
  const userExist = await userRepository.findById(id);
  if (!userExist) {
    const err = new Error("no user found with this id");
    err.statusCode = 404;
    throw err;
  }
  return userExist;
}

export { createUser, updateUser, findByEmail ,findById };