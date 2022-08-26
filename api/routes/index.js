const user = require("./users");
const express = require("express");
const router = express.Router();
const car = require("./car");
const products = require("./products");

router.use(user);
router.use("/car", car);
router.use("/products", products);

module.exports = router;
