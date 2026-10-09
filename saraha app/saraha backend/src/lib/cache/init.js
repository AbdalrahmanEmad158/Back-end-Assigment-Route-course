
import { RedisCacheProvider } from "../../pkg/cache/redis.js";
import envConfig  from "../config/env.config.js";


 export const cacheProvider = new RedisCacheProvider({
   
       host: process.env.REDIS_HOST||envConfig.REDIS_HOST,
            port: process.env.REDIS_PORT||envConfig.REDIS_PORT,
            password: process.env.REDIS_PASSWORD||envConfig.REDIS_PASSWORD,
          
 })