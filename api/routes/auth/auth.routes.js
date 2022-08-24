const {
    getSignUp,
    getLogIn,
    postLogIn,
    postSignUp,
} = require("../../controllers/auth.controllers.js");

const express = require("express");
const router = express.Router();

router.get("/signup", getSignUp);
router.post("/signup", postSignUp);
router.get("/login", getLogIn);
router.post("login", postLogIn);

module.exports = router;
