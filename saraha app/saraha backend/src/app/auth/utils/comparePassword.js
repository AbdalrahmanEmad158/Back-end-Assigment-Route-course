import bcrypt from "bcrypt"           //hashing password
export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}


/*
export async function comparePassword(password, hashedPassword) {
  return argon2.verify(hashedPassword, password);
}
  */
 