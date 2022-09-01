const {carCtrl} = require("../controllers")
const express = require("express")
const { validateAuth } = require("../middlewares/auth.js");

const router = express.Router()

router.get("/", validateAuth, carCtrl.findCartByUser)
router.post("/",validateAuth, carCtrl.addProductToCart)
router.delete("/", validateAuth, carCtrl.deleteProductToCart)
router.put("/", validateAuth, carCtrl.updateProductToCart)

module.exports=router;