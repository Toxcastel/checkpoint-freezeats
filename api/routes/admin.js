const { adminCtrl } = require("../controllers");
const { validateAuth } = require("../middlewares/auth.js");
const express = require("express");
const router = express.Router();

// router.post("/signup", adminCtrl.signup);
// router.post("/login", adminCtrl.login);
// router.post("/logout", adminCtrl.logout);
// router.put("/profile", validateAuth, adminCtrl.updateUser);
// router.get("/profile", validateAuth, adminCtrl.getUser);

module.exports = router;
