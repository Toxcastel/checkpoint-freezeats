const { validateToken } = require("../config/tokens");

function validateAuth(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).send("Token is not valid");

    const { user } = validateToken(token);
    if (!user) return res.status(401).send("User not found");

    req.user = user;
    
    next();
}

module.exports = { validateAuth };
