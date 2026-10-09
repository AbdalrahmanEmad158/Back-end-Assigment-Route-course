import crypto from "node:crypto"
import {cacheProvider} from "../cache/init.js"
export default function idEmpotency(ttl = 60*60*1000){
   return async function(req,res,next){
    const idempotencyKey = req.headers['idempotency-key']
    if(!idempotencyKey){
        return res.status(400).json({error:"idempotency-key header is required"})
    }   
    let key = `${req.method}:${req.originalUrl}:${idempotencyKey}`
   const cache = await cacheProvider.get(key)
   if(cache){
    res.setHeader('X-cache',"HIT")
    return res.status(409).json({error:"Duplicate request"})
   }
   
const originalJson = res.json.bind(res)
res.json = async (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
       await cacheProvider.set(key, JSON.stringify(body), ttl)
       res.setHeader('X-cache',"MISS")

    }
   return originalJson(body)
}
     next()
   }
}