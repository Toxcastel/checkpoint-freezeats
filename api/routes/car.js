const {carCtrl} = require("../controllers")
const express = require("express")

const router = express.Router()



router.get("/", carCtrl.findAllProductsInCart)
router.post("/", carCtrl.addProductToCart)
router.delete("/", carCtrl.deleteProductToCart)
router.put("/", carCtrl.updateProductToCart)

module.exports=router;