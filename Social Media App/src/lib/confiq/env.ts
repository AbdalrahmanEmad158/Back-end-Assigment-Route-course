import "dotenv/config";
import { z } from 'zod';
const schema: any = z.object({
  PORT: z.string().default('3000'),
  MONGODB_URL: z.string(),

  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),

  MAIL_USER: z.string().trim().toLowerCase(),
  MAIL_PASSWORD: z.string(),

  GOOGLE_WEB_OAUTH_CLIENT_ID: z.string(),

  REDIS_PORT: z.string().default('6379'),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),

  MAILJET_API_KEY: z.string(),
  MAILJET_API_SECRET: z.string(),
  MAILJET_FROM_EMAIL: z.string(),
  MAILJET_FROM_NAME: z.string(),
});


const parsed = schema.parse(process.env);

export const env = {
    nodeMailer : {
        user: parsed.MAIL_USER,
        password: parsed.MAIL_PASSWORD,
        
     
    },
  port: Number(parsed.PORT),
  db: {
    url: parsed.MONGODB_URL,
  },
  google: {
    webClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID,
    iosClientId: parsed.GOOGLE_WEB_OAUTH_CLIENT_ID,
  },
  redis: {
    host: parsed.REDIS_HOST,
    port: parsed.REDIS_PORT,
    password: parsed.REDIS_PASSWORD,
  },
  mailjet: {
    apiKey: parsed.MAILJET_API_KEY,
    apiSecret: parsed.MAILJET_API_SECRET,
    fromEmail: parsed.MAILJET_FROM_EMAIL,
    fromName: parsed.MAILJET_FROM_NAME,
  },
  jwt: {
    accessSecret: parsed.JWT_ACCESS_SECRET,
    refreshSecret: parsed.JWT_REFRESH_SECRET,
  }
};