const {orderCtrl} = require("../controllers")
const express = require("express")
const { validateAuth } = require("../middlewares/auth")
const router = express.Router()


router.get("/user", orderCtrl.findUserOrders)
router.get("/", validateAuth,orderCtrl.findOrder)
router.post("/", validateAuth,orderCtrl.addOrder)
router.put("/checkout", validateAuth,orderCtrl.orderFullfiled)
router.put("/rejected", validateAuth,orderCtrl.orderRejected)
router.put("/shipping", validateAuth,orderCtrl.orderShippingMethod)
router.put("/payment", validateAuth,orderCtrl.orderPaymentMethod)
router.put("/address", validateAuth,orderCtrl.orderAddress)



module.exports=router;