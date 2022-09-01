const {orderCtrl} = require("../controllers")
const express = require("express")

const router = express.Router()

router.get("/", orderCtrl.findAllOrder)
router.get("/user", orderCtrl.findUserOrders)
router.post("/", orderCtrl.addOrder)
router.put("/checkout", orderCtrl.orderFullfiled)
router.put("/rejected", orderCtrl.orderRejected)

module.exports=router;