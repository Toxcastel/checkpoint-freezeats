const express = require("express");
const { prodCtrl } = require("../controllers");
const router = express.Router();

router.get("/", prodCtrl.getProducts);
router.get("/:id", prodCtrl.getOneProduct);
router.get("/category/:category", prodCtrl.getProductsByCategory);
router.get("/search/:name", prodCtrl.getProductByName);
router.post("/", prodCtrl.postProduct);
router.patch("/:id", prodCtrl.editProduct);
router.delete("/:id", prodCtrl.deleteProduct);

module.exports = router;
