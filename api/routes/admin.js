const { adminCtrl } = require("../controllers");
const { validateAuth, validateAdmin } = require("../middlewares/auth.js");
const express = require("express");
const router = express.Router();

console.log("ENTRE A ADMIN");
// router.post("/signup", adminCtrl.signup);
// router.post("/login", adminCtrl.login);
// router.post("/logout", adminCtrl.logout);
// router.put("/profile", validateAuth, adminCtrl.updateUser);
router.get("/", adminCtrl.getAdmin);
router.get("/users", adminCtrl.getAllUsers);
router.get("/roles/:role", adminCtrl.getRoleById);
router.get("/roles", adminCtrl.getRoles);

module.exports = router;
