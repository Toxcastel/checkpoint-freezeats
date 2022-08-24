const {carCtrl} = require("../controllers")
const express = require("express")

const router = express.Router()

router.get("/", carCtrl.findAllProductsInCart)
router.post("/", carCtrl.addProductToCart)
router.delete("/:id", carCtrl.deleteProductToCart)
router.put("/:id", carCtrl.updateProductToCart)

module.exports=router;