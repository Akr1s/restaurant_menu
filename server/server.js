const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const infoRoutes = require("./routes/info.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port);
