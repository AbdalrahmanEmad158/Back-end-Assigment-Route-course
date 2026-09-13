import { db } from "../../common/db/mongodb.config.js";

export const insertLog = async (log) => {
  return await db.collection("logs").insertOne(log);
};