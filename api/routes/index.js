const user = require("./users");
const express = require("express");
const router = express.Router();
const authRoutes = require("./auth/auth.routes.js");
const car = require("./car");

router.use(authRoutes);
router.use("/", user);
router.use("/car", car);


module.exports = router;
