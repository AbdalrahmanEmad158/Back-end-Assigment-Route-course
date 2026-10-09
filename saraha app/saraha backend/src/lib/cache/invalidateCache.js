import { cacheProvider } from "./init.js";

export function invalidateCache(key) {
    console.log("INVALIDATE KEY:", key);
    return async (req, res, next) => {
        if (req.method === "GET") {
            return next();
        }

        console.log("INVALIDATE KEY:", key);

        const deleted = await cacheProvider.del(key);

        console.log("DELETE RESULT:", deleted);

        next();
    };
}