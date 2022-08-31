const { adminCtrl } = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/", adminCtrl.getAdmin);
router.get("/users", adminCtrl.getAllUsers);
router.get("/roles/:role", adminCtrl.getRoleById);
router.get("/roles", adminCtrl.getRoles);
router.put("/users/:id", adminCtrl.changeRole);
router.delete("/users/:id", adminCtrl.deleteUser);

module.exports = router;
