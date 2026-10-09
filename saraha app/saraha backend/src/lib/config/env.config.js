import dotenv from "dotenv"

dotenv.config({path:[`.${process.env.NODE_ENV}.env`,'.env']})
console.log("process.env.MAIL_JET_API_KEY",process.env.MAIL_JET_API_KEY)

 const envConfig = {
 PORT : process.env.PORT || 5000,
 MONGOOSE_URI : process.env.DB_URI || '',
 EMAIL : process.env.MAIL_USER || "",
 EMAIL_PASS : process.env.MAIL_PASS || "",
 JWT_SECRET : process.env.JWT_SECRET || '',
ENCRYPTION_KEY : process.env.ENCRYPTION_KEY || "",
SALT_ROUND : Number(process.env.SALT_ROUND) || 10,
 IV_LENGTH : Number(process.env.IV_LENGTH) || 16,
 REDIS_HOST : process.env.REDIS_HOST || "",
REDIS_PORT : Number(process.env.REDIS_PORT) ||  6379,
REDIS_PASSWORD : process.env.REDIS_PASSWORD || "",

MAIL_JET_API_KEY : process.env.MAIL_JET_API_KEY || "",
MAIL_JET_SECRET_KEY : process.env.MAIL_JET_SECRET_KEY || "",
MAIL_JET_FROM_EMAIL : process.env.MAIL_JET_FROM_EMAIL || "",
MAIL_JET_FROM_NAME : process.env.MAIL_JET_FROM_NAME || "",
}

export default envConfig





/*
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: [`.${process.env.NODE_ENV}.env`, ".env"],
});

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),

  DB_URI: z.string().min(1),

  MAIL_USER: z.string().email(),
  MAIL_PASS: z.string().min(1),

  JWT_SECRET: z.string().min(1),
  ENCRYPTION_KEY: z.string().min(1),

  SALT_ROUND: z.coerce.number().default(10),
  IV_LENGTH: z.coerce.number().default(16),

  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().optional(),
});

const parsed = envSchema.parse(process.env);

const envConfig = {
  PORT: parsed.PORT,

  MONGODB_URI: parsed.DB_URI,

  EMAIL: parsed.MAIL_USER,
  EMAIL_PASS: parsed.MAIL_PASS,

  JWT_SECRET: parsed.JWT_SECRET,
  ENCRYPTION_KEY: parsed.ENCRYPTION_KEY,

  SALT_ROUND: parsed.SALT_ROUND,
  IV_LENGTH: parsed.IV_LENGTH,

  REDIS_HOST: parsed.REDIS_HOST,
  REDIS_PORT: parsed.REDIS_PORT,
  REDIS_PASSWORD: parsed.REDIS_PASSWORD,
};

export default envConfig;
 */
