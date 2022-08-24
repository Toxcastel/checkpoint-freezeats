//Se ejecuta la conexion a mongo
require("./db");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/products");
const cookieParser = require("cookie-parser");
const app = express();

//Se llama al modelo
const { User, Product, Payment, Car } = require("./models");

require("dotenv").config();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
