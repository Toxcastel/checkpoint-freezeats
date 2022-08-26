const express = require("express");
const { prodCtrl } = require("../controllers");
const router = express.Router();

router.get("/", prodCtrl.getProducts);
router.get("/:id", prodCtrl.getOneProduct);
router.post("", prodCtrl.postProduct);
router.patch("/:id", prodCtrl.editProduct);
router.delete("/:id", prodCtrl.deleteProduct);
router.get("/search", prodCtrl.searchByName);

module.exports = router;
