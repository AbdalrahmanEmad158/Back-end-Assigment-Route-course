import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { logger } from "../../pkg/logger/logger.js";
import envConfig from "../config/env.config.js";
import { userModel } from "../../app/user/model/user.model.js";
export const connectDB = async (/*app,port */) => {
  try {
await mongoose.connect(process.env.ATLAS_DB_URL||envConfig.ATLAS_DB_URL||envConfig.MONGOOSE_URI);
    logger.info("DB connected");
    await userModel.syncIndexes()
  /*
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    }
) */
  }
    catch (error) { 
    logger.error(error);
      throw new Error("fail to connect database");
  }
};