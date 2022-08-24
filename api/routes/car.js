const {CarCtrl} = require("../controllers/car")
const express = require("express")

const router = express.Router()

router.get("/", CarCtrl.findAllProductsInCart)
router.post("/", CarCtrl.addProductToCart)
router.delete("/:id", CarCtrl.deleteProductToCart)
router.put("/:id", CarCtrl.updateProductToCart)

module.exports=router;