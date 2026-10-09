import dotenv from "dotenv";

import http from "http";
import { createApp } from "./app.js";
import mongoose from "mongoose";
import { logger } from "./pkg/logger/logger.js";
import { connectDB } from "./lib/db/mongoose.js";

import envConfig from "./lib/config/env.config.js";

dotenv.config();

const app = createApp();
const server = http.createServer(app);
async function startServer()
{
  try {
      await connectDB();
       server.listen(process.env.PORT||envConfig.PORT, () => {
      logger.info(`Server is running on port ${process.env.PORT||envConfig.PORT}`);
    }
)
  }
  catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

async function shutDown() {

  try {
    logger.info("Shutting down server...");
      await mongoose.disconnect();
    server.close(()=>{process.exit(0)})
  }
    catch (error) {
    logger.error(error);
    process.exit(1);
    }
    
}

process.on("SIGINT", () => {
  shutDown()
});

process.on("SIGTERM", () => {
    shutDown()
});

startServer()