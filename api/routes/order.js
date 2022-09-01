const {orderCtrl} = require("../controllers")
const { validateAuth } = require("../middlewares/auth.js");
const express = require("express")

const router = express.Router()

router.get("/", validateAuth,orderCtrl.findAllOrder)
router.post("/", validateAuth,orderCtrl.addOrder)
router.put("/checkout", validateAuth,orderCtrl.orderFullfiled)
router.put("/rejected", validateAuth,orderCtrl.orderRejected)

module.exports=router;