const user = require("./users");
const express = require("express");
const router = express.Router();
const car = require("./car");


router.use(user);
router.use("/car", car);


module.exports = router;
