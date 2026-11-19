
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from'cookie-parser';
import { globalErrorHandler, invalidRouteErrorHandler } from "./lib/error/error.handler.js";
import appRouter from "./app.routes.js";
import CorrelationId from "./pkg/correlation/correlationId.js"
import {ipKeyGenerator, rateLimit} from 'express-rate-limit'
import { toMs } from "./pkg/utils/time.js";
import { AppError } from "./pkg/error/error.js";
import helmet from 'helmet';
import { limeter } from "./lib/rateLimiting/rateLimiting.middleWare.js";


export function createApp()
{
    const app = express();
   


    app.use(limeter)
      app.use(helmet())
app.use(cors())
    app.use('/uploads',express.static('uploads'));
//connectDB(app,process.env.PORT||envConfig.PORT );
app.use(express.json());
app.use(cookieParser())
app.use(CorrelationId);

app.get('/health', (req, res) => {
    console.log(`Hit on port: ${process.env.PORT}`);
    res.status(200).json({ status: 'ok', port: process.env.PORT });
});

app.use("/api",appRouter)
app.use(invalidRouteErrorHandler);
app.use(globalErrorHandler);

return app;
}

