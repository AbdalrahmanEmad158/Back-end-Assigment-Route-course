import { cacheProvider } from "./init.js"

export function withCache(ttl=3600) {
    return  async (req,res,next) => {
        if (req.method !== "GET") {
    return next()
}


        let key = `${req.method}:${req.originalUrl}`
         console.log("CACHE KEY:", key);
      const cachedData = await cacheProvider.get(key)
         console.log("CACHED DATA:", cachedData);
      if(cachedData){
        res.setHeader('X-Cache', 'HIT')
        return res.status(200).json(JSON.parse(cachedData))
      }
      const originalJson = res.json.bind(res)
      res.json = async (body) =>{
      if (res.statusCode >= 200 && res.statusCode < 300) {
        await cacheProvider.set(key, JSON.stringify(body), ttl)
        res.setHeader('X-Cache', 'MISS')
      }
     return originalJson(body)
      }
        next()
    }
} 