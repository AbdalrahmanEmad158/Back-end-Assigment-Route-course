import { cacheProvider } from "./init.js"
import { calcTtl, redisGet, redisSet } from "../cacheRedis/redis.srvices.js";

export function withCache(ttl=3600) {
    return  async (req,res,next) => {
        if (req.method !== "GET") {
    return next()
}


        let key = `${req.method}:${req.originalUrl}`
  
     // const cachedData = await cacheProvider.get(key)
      const cachedData = await redisGet(key)
     
      if(cachedData){
        res.setHeader('X-Cache', 'HIT')
        return res.status(200).json(JSON.parse(cachedData))
      }
      const originalJson = res.json.bind(res)
      res.json = async (body) =>{
      if (res.statusCode >= 200 && res.statusCode < 300) {
       // await cacheProvider.set(key, JSON.stringify(body), ttl)
          await redisSet({key, value : JSON.stringify(body),options: {EX:ttl}})
        res.setHeader('X-Cache', 'MISS')
      }
     return originalJson(body)
      }
        next()
    }
} 