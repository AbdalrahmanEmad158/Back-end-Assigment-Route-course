import Redis from "ioredis";
import { ICacheProvider } from "./cache.interface";
interface IRedisConfig {
    host: string;
    port: number;
    password: string;
    db?: number;
    tls?: boolean;
}
export class RedisCacheProvider implements ICacheProvider {
    private client:any
    constructor(config:IRedisConfig)
    {
        this.client = new Redis({
            
           
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime: 3,

           // db: config.db,
           // tls: config.tls ? {} : undefined
        })
        // handle Redis errors but not connection errors
        this.client.on("error", (err:Error) => {
            console.error("Redis server error:", err);
        });

        // handle connection errors
        this.client.connect().catch((err:Error) => {
            console.error("Redis connection error:", err);
        }       
    )
    }
      
    async set(key :string, value:string, ttl:number) {
    try {
        return await this.client.set(key, value, "EX", ttl);
    } catch (error) {
        console.error("Redis SET error:", error);
        return null;
    }
}


    async get(key:string) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error("Redis GET error:", error);
            return null;
        }
    }

    async del(key:string) {
        try {
            return await this.client.del(key);
        } catch (error) {
            console.error("Redis DELETE error:", error);
            return null;
        }
}

   async ttl(key:string) {
        try {
            return await this.client.ttl(key);
        } catch (error) {
            console.error("Redis TTL error:", error);
            return null;
        }
}
}