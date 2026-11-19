import express from "express";
import appRouter from "./route";

export function createApp() {
  const app = express();
  
  app.use(express.json());
  app.use('/api', appRouter);

  return app;
}