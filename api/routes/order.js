const {orderCtrl} = require("../controllers")
const express = require("express")

const router = express.Router()

router.get("/", orderCtrl.findAllOrder)
router.post("/", orderCtrl.addOrder)


module.exports=router;