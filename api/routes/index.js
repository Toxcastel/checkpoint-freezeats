const user = require("./users")
const express= require("express")
const router = express.Router()

router.use("/user", user )