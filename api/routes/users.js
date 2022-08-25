const { userCtrl } = require("../controllers");
const { validateAuth } = require("../middlewares/auth.js");
const express = require("express");
const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/logout", userCtrl.logout);
router.put("/profile", userCtrl.updateUser);
router.get("/profile", validateAuth, userCtrl.getUser);

module.exports = router;
