import express, { Application, NextFunction, Response, Request } from "express";
import dotenv from "dotenv";
import appRouter from "./routes";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./docs";
import { AppConfig } from "./constants/swagger";

dotenv.config();
const app: Application = express();

const environmentPort: number = Number(process.env.PORT);
const port: number = environmentPort || 8080;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api/", appRouter);

const docs = swaggerJSDoc(swaggerConfig);

app.use(AppConfig.DOCS, swaggerUi.serve, swaggerUi.setup(docs));

app.listen(port);
