import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";


const url = process.env.MONGODB_URL ;
const dbName = process.env.MONGODB_DB_NAME;

const client = new MongoClient(url);
export const db = client.db(dbName);

export const cheakHealthConnectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    
  } 
}
