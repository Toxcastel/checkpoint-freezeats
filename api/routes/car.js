const cartController = require("../controllers/Car")
const express = require("express")

const router = express.Router()

router.get("/", cartController.findAllProductsInCart)
router.post("/", cartController.addProductToCart)
router.delete("/:id", cartController.deleteProductToCart)
router.put("/:id", cartController.updateProductToCart)