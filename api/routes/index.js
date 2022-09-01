const express = require("express");
const user = require("./users");
const admin = require("./admin");
const router = express.Router();
const car = require("./car");
const products = require("./products");
const order = require("./order");
const favorites = require("./favorites");
const { validateAuth, validateAdmin } = require("../middlewares/auth.js");

router.use("/user", user);
router.use("/admin", validateAuth, validateAdmin, admin);
router.use("/car", car);
router.use("/products", products);
router.use("/order", validateAuth, order);
router.use("/fav", favorites);

module.exports = router;
