const jwt = require("jsonwebtoken");
const { SECRET } = require("./index");

const generateToken = (payload) =>
    jwt.sign({ user: payload }, SECRET, { expiresIn: "1d" });

const validateToken = (token) => jwt.verify(token, SECRET);

module.exports = { generateToken, validateToken };
