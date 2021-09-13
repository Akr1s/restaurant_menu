import express, { Application } from "express";
import dotenv from "dotenv";
import infoRoutes from "./routes/info.routes";
import categoriesRoutes from "./routes/categories.routes";
import dishesRouter from "./routes/dishes.routes";

dotenv.config();
const app: Application = express();

const environmentPort: number = Number(process.env.PORT);
const port: number = environmentPort || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/info/", infoRoutes);
app.use("/categories/", categoriesRoutes);
app.use("/dishes/", dishesRouter);

app.listen(port);
