const express = require("express");
const { prodCtrl } = require("../controllers");
const router = express.Router();

router.get('/products', prodCtrl),
router.get('/products/:id', prodCtrl),
router.post('/products', prodCtrl),
router.patch('/products/:id', prodCtrl),
router.delete('/products/:id', prodCtrl),


module.exports = router;
