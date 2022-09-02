const {orderCtrl} = require("../controllers")
const { validateAuth } = require("../middlewares/auth.js");
const express = require("express")

const router = express.Router()

router.get("/", validateAuth,orderCtrl.findOrder)
router.post("/", validateAuth,orderCtrl.addOrder)
router.put("/checkout", validateAuth,orderCtrl.orderFullfiled)
router.put("/rejected", validateAuth,orderCtrl.orderRejected)
router.put("/shipping", validateAuth,orderCtrl.orderShippingMethod)
router.put("/payment", validateAuth,orderCtrl.orderPaymentMethod)
router.put("/address", validateAuth,orderCtrl.orderAddress)



module.exports=router;