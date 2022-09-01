const jwt = require("jsonwebtoken");
const { SECRET, ADMIN } = require("./index");

const generateToken = (payload) =>
    jwt.sign({ user: payload }, SECRET, { expiresIn: "1d" });

const generateAdmin = (payload) =>
    jwt.sign({ user: payload }, ADMIN, { expiresIn: "1d" });

const validateToken = (token) => jwt.verify(token, SECRET);

const validateTokenAdmin = (token) => jwt.verify(token, ADMIN);

module.exports = {
    generateToken,
    generateAdmin,
    validateToken,
    validateTokenAdmin,
};
