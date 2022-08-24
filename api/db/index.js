const mongoose = require("mongoose");
const { MONGO_URL } = require("../config/index.js");


const db = mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Base de datos conectada"))
    .catch((err) => console.error(err));

module.exports = db;
