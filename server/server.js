const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

const infoRoutes = require("./routes/info.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/info/", infoRoutes);
app.listen(port);
