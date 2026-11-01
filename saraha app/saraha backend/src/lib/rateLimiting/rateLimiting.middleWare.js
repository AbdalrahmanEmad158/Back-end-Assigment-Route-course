import { rateLimit,ipKeyGenerator } from "express-rate-limit";
import { toMs } from "../../pkg/utils/time.js";
import axios from 'axios'
import { AppError } from "../../pkg/error/error.js";
import {RedisStore} from "rate-limit-redis"
import { redisClient } from "../cacheRedis/redisClient.js";



async function getIPDetails(ip) {
  if (!ip || ip === "127.0.0.1" || ip === "::1") {
    return { data: { countryCode: "EG" } };
  }
  try {
    return await axios.get(`http://ip-api.com/json/${ip}`, { timeout: 1000 });
  } catch (error) {
    return { data: { countryCode: "UNKNOWN" } };
  }
}



export const limeter = rateLimit({
       // limit:10,
       limit: async (req) => {
  const { data: { countryCode } } = await getIPDetails(req.headers['x-forwarded-for'])
  console.log({ countryCode },"12",req.headers['x-forwarded-for']);

  let max;
  switch (countryCode) {
    case 'EG':
      max = 5;
      break;
    case 'US':
      max = 4;
      break;
    default:
      max = 30;
  }
console.log("ahaa")
  return max;
},
        windowMs:toMs(2,"m"),
        standardHeaders:"draft-8",
        handler:function (req,res,next) {
            next(new AppError(this.message,this.statusCode))
        },
       /*
          identifier: function (req) {
    return `${req.ip}:${req.url}`;
  }
     */
 

  /*
  
      keyGenerator: (req, res) => {

const ip = ipKeyGenerator(req.ip);

return `${ip}_${req.url}`;
}
*/

 keyGenerator: (req, res) => {

const ip = ipKeyGenerator(req.ip);

return `${ip}_${req.url}`;
},

store: new RedisStore({
		sendCommand: (...args) => redisClient.sendCommand(args),
	}),
    })