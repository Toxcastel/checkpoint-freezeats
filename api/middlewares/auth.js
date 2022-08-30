const { validateToken, validateTokenAdmin } = require("../config/tokens");

function validateAuth(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).send("Token is not valid");

    const { user } = validateToken(token);
    if (!user) return res.status(401).send("User not found");

    req.user = user;

    next();
}

function validateAdmin(req, res, next) {
    const token = req.cookies.role;
    if (!token) return res.status(401).send("Token is not valid");

    const { user } = validateTokenAdmin(token);
    console.log("USER ROLES EN VALIDATEADMIN: ", user);
    if (!user) return res.status(401).send("User not found");

    req.authRole = user;

    next();
}

module.exports = { validateAuth, validateAdmin };
