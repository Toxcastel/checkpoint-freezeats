const user = require("./users");
const express = require("express");
const router = express.Router();
const car = require("./car");
const product = require('./products')
const order = require("./order");


router.use("/user",user);
router.use("/car", car);
router.use("/products",product);
router.use("/order", order);


module.exports = router;
