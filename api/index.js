//Se ejecuta la conexion a mongo
require("./db");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const { createRoles } = require("./utils/auth.utils.js");
const app = express();
createRoles();

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

