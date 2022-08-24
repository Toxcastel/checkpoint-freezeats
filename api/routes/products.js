const express = require("express");
const { prodCtrl } = require("../controllers");
const router = express.Router();

router.get("/products", prodCtrl.getProducts);
router.get("/products/:id", prodCtrl.getOneProduct);
router.post("/products", prodCtrl.postProduct);
router.patch("/products/:id", prodCtrl.editProduct);
router.delete("/products/:id", prodCtrl.deleteProduct);
module.exports = router;
