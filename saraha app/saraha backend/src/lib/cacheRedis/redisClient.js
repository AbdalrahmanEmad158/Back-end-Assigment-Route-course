import { createClient } from "redis";
import { RidesConfig } from "./cacheRedis.js";
import { logger } from "../../pkg/logger/logger.js";


export const redisClient = await createClient(RidesConfig)




export const redisConnection = async()=>{
    try {
      await  redisClient.connect()
        logger.info("redis connect successful");
    } catch (error) {
         logger.error("Redis Client Error", error)
    }
};
