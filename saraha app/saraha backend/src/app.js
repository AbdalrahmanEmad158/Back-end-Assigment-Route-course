
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from'cookie-parser';
import { globalErrorHandler, invalidRouteErrorHandler } from "./lib/error/error.handler.js";
import appRouter from "./app.routes.js";
import CorrelationId from "./lib/correlation/correlationId.js";

export function createApp()
{
    const app = express();
app.use(cors());
//connectDB(app,process.env.PORT||envConfig.PORT );
app.use(express.json());
app.use(cookieParser())
app.use(CorrelationId);
app.use("/api",appRouter)
app.use(invalidRouteErrorHandler);
app.use(globalErrorHandler);

return app;
}

