require("dotenv").config();

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    SECRET: process.env.SECRET || "COMIDASCONGELADAS",
    CLIENT_ID: process.env.CLIENT_ID,
    SECRET_CLIENT: process.env.SECRET_CLIENT,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    REDIRECT_URI: process.env.REDIRECT_URI,
};
