import { redisClient } from "./redisClient.js";

 export const  redisSet  =async({key, value, options}) =>{
    try {
        return await redisClient.set(key, value,options);
    } catch (error) {
        console.error("Redis SET error:", error);
        return null;
    }
}

  export const  redisGet = async(key) =>{
        try {
            return await redisClient.get(key);
        } catch (error) {
            console.error("Redis GET error:", error);
            return null;
        }
    }

       export const redisDel = async(key) =>{
        try {
            return await redisClient.del(key);
        } catch (error) {
            console.error("Redis DELETE error:", error);
            return null;
        }
}

export const redisTtl = async(key)  =>{
    return redisClient.ttl(key)
}

export const redisExpire = async(key,expireIn)  =>{
    return redisClient.expire(key,expireIn)
}

export const calcTtl = async(expire)  =>{
    const currentTime = Math.ceil(Date.now()/1000)       
    return Math.ceil(expire-currentTime)
}
