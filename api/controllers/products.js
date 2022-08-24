const express = require("express");
// const mongoose = require("mongoose")
const Product = require("../models/Products");
const prodCtrl = {
  getProducts: async (req, res) => {
    const products = await Product.find();
    res.send(products);
  },
  getOneProduct: async (req, res) => {
    const product = await Product.findById({ _id: req.params.id });
    res.send(product);
  },
  postProduct: async (req, res) => {
    const { id, name, description, stock, price, category, rating } = req.body;
    const product = new Product({
      id,
      name,
      description,
      stock,
      price,
      category,
      rating,
    });
    await product.save();
    res.send(product);
  },
  editProduct: async (req, res) => {
    try {
      const product = await Product.findById({ _id: req.params.id });

      if (req.body.name) {
        product.name = req.body.name;
      }
      if (req.body.description) {
        product.description = req.body.description;
      }
      if (req.body.stock) {
        product.stock = req.body.stock;
      }
      if (req.body.price) {
        product.price = req.body.price;
      }
      if (req.body.category) {
        product.category = req.body.category;
      }

      await product.save();
      res.send(product);
    } catch {
      res.status(404);
      res.send({ error: "Product doesn't exist!" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.deleteOne({ _id: req.params.id });
      res.status(204).send();
    } catch {
      res.status(404);
      res.send({ error: "Product doesn't exist!" });
    }
  },
};

module.exports = prodCtrl;
