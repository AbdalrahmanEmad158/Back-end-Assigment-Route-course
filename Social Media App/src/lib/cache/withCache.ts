import { cacheProvider } from "./init"
import { NextFunction,Response ,Request} from "express";

export function withCache(ttl=3600) {
    return  async (req:Request,res:Response,next:NextFunction) => {
        if (req.method !== "GET") {
    return next()
}


        let key = `${req.method}:${req.originalUrl}`
  
     // const cachedData = await cacheProvider.get(key)
      const cachedData = await cacheProvider.get(key)
     
      if(cachedData){
        res.setHeader('X-Cache', 'HIT')
        return res.status(200).json(JSON.parse(cachedData))
      }
      const originalJson = res.json.bind(res)
      res.json =  (body) =>{
      if (res.statusCode >= 200 && res.statusCode < 300) {
       cacheProvider.set(key, JSON.stringify(body), ttl)
          
        res.setHeader('X-Cache', 'MISS')
      }
     return originalJson(body)
      }
        next()
    }
} 