const {userCtrl} = require("../controllers")
const express= require("express")
const router= express.Router()

router.post("/sign", userCtrl.signIn)
router.post("/login", userCtrl.login)
router.post("/logout", userCtrl.logout)
router.put("/profile", userCtrl.updateUser)
router.get("/profile/:id", userCtrl.getUser)


module.exports= router

