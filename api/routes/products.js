const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/products/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.send(product);
});

router.post("/products", async (req, res) => {
  const product = new Product({
    _id: req.body.title,
    name: req.body.content,
  });
  await product.save();
  res.send(product);
});

router.patch("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (req.body.title) {
      product.title = req.body.title;
    }

    if (req.body.content) {
      product.content = req.body.content;
    }

    await product.save();
    res.send(product);
  } catch {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

module.exports = router;
