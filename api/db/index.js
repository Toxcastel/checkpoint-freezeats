const mongoose = require("mongoose");
const { MONGO_URL } = require("../config/index.js");
console.log(MONGO_URL);

const db = mongoose
    .connect(MONGO_URL)
    .then(() => console.log("db connected"))
    .catch((err) => console.error(err));

module.exports = db;
