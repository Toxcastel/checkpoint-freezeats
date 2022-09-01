const express = require("express");
const { validateAuth } = require("../middlewares/auth.js");
const { favCtrl } = require("../controllers");
const router = express.Router();

router.post("/", validateAuth, favCtrl.addFavorite);
router.delete("/", validateAuth, favCtrl.removeFavorite);
router.get("/", validateAuth, favCtrl.getFavorites)

module.exports = router;
