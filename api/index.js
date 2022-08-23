const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
const db = require("./db");
require("dotenv").config();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", () => console.log("HOALAAA"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server listening on ${PORT} y esta es la db ${db}`);
});
