const user = require("./users");
const express = require("express");
const router = express.Router();
const authRoutes = require("./auth/auth.routes.js");

router.use(authRoutes);
router.use("/", user);

module.exports = router;
