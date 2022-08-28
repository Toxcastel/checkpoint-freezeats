const express = require("express");
const user = require("./users");
const admin = require("./admin");
const router = express.Router();
const car = require("./car");
const products = require("./products");
const order = require("./order");

router.use("/user", user);
router.use("/admin", admin);
router.use("/car", car);
router.use("/products", products);
router.use("/order", order);

module.exports = router;
