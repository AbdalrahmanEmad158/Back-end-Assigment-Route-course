import mongoose from "mongoose";
import { env } from "../confiq/env";
mongoose.connect(env.db.url  ||process.env.MONGODB_URL as string)
 
  
   




/*
import mongoose from "mongoose";
import { env } from "../confiq/env";
export const connectDB = async (/*app,port ) => {
  try {
await mongoose.connect(env.db.url||process.env.MONGODB_URL as string);
   // logger.info("DB connected");
    //await userModel.syncIndexes()
  /*
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    }
) 
  }
    catch (error) { 
    //logger.error(error);
      throw new Error("fail to connect database");
  }
};

*/