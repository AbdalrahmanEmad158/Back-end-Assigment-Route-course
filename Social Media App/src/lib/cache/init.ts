
import { RedisCacheProvider } from "../../pkg/cache/redis.js";
import { env } from "../confiq/env.js";


 export const cacheProvider = new RedisCacheProvider({
   
       host: process.env.REDIS_HOST||env.redis.host,
            port: process.env.REDIS_PORT||env.redis.port,
            password: process.env.REDIS_PASSWORD||env.redis.password,
          
 })