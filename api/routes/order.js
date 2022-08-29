const {orderCtrl} = require("../controllers")
const express = require("express")

const router = express.Router()

router.get("/", orderCtrl.findAllOrder)
router.post("/", orderCtrl.addOrder)
router.put("/checkout", orderCtrl.orderFullfiled)
router.put("/rejected", orderCtrl.orderRejected)

module.exports=router;