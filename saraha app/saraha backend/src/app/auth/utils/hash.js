import envConfiq from "../../../lib/config/env.config.js"
import bcrypt from "bcrypt";

export async function hashPassword(password) {
  return bcrypt.hash(password, Number(process.env.SALT_ROUND)||envConfiq.SALT_ROUND);
}




/*

import argon2 from "argon2";

export async function hashPassword(password) {
  return argon2.hash(password);
}



*/