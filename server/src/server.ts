import express, { Application } from "express";
import dotenv from "dotenv";
import appRouter from "./routes";

dotenv.config();
const app: Application = express();

const environmentPort: number = Number(process.env.PORT);
const port: number = environmentPort || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", appRouter);

app.listen(port);
