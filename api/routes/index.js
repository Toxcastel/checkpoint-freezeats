const express = require("express");
const authRoutes = require("./auth/auth.routes.js");
const router = express.Router();

router.use(authRoutes);

module.exports = router;
