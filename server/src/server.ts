import express, { Application, NextFunction, Response, Request } from "express";
import dotenv from "dotenv";
import appRouter from "./routes";
import cors from "cors";

dotenv.config();
const app: Application = express();

const environmentPort: number = Number(process.env.PORT);
const port: number = environmentPort || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/", appRouter);

app.listen(port);
