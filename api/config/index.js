require("dotenv").config();

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    SECRET: process.env.SECRET || "COMIDASCONGELADAS",
};
