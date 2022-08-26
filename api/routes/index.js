const user = require("./users");
const express = require("express");
const router = express.Router();
const car = require("./car");
const order = require("./order");


router.use(user);
router.use("/car", car);
router.use("/order", order);

module.exports = router;
