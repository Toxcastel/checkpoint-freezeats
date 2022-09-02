const express = require("express");
const { prodCtrl } = require("../controllers");
const { validateAuth, validateAdmin } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", prodCtrl.getProducts);
router.get("/all", prodCtrl.getAllProducts);
router.get("/:id", prodCtrl.getOneProduct);
router.put("/:id", validateAuth, validateAdmin, prodCtrl.editProduct)
router.get("/category/:category", prodCtrl.getProductsByCategory);
router.get("/search/:name", prodCtrl.getProductByName);
router.post("/", prodCtrl.postProduct);
router.patch("/:id", prodCtrl.editProduct);
router.delete("/:id", validateAuth, validateAdmin, prodCtrl.deleteProduct);

module.exports = router;
