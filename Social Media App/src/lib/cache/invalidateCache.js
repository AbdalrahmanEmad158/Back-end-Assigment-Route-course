import { redisDel } from "../cacheRedis/redis.srvices.js";
import { cacheProvider } from "./init.js";

export function invalidateCache(key) {

    return async (req, res, next) => {
        if (req.method === "GET") {
            return next();
        }

     

       // const deleted = await cacheProvider.del(key);
        const deleted = await redisDel(key);

  

        next();
    };
}