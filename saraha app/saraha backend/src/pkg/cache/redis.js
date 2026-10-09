import Redis from "ioredis";
export class RedisCacheProvider {
    client
    constructor(config)
    {
        this.client = new Redis({
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime: 3,

           // db: config.db,
           // tls: config.tls ? {} : undefined
        })
        // handle Redis errors but not connection errors
        this.client.on("error", (err) => {
            console.error("Redis server error:", err);
        });

        // handle connection errors
        this.client.connect().catch((err) => {
            console.error("Redis connection error:", err);
        }       
    )
    }
      
    async set(key, value, ttl) {
    try {
        return await this.client.set(key, value, "EX", ttl);
    } catch (error) {
        console.error("Redis SET error:", error);
        return null;
    }
}


    async get(key) {
        try {
            return await this.client.get(key);
        } catch (error) {
            console.error("Redis GET error:", error);
            return null;
        }
    }

    async del(key) {
        try {
            return await this.client.del(key);
        } catch (error) {
            console.error("Redis DELETE error:", error);
            return null;
        }
}
}