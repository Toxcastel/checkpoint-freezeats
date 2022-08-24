const mongoose = require("mongoose");
const { Car } = require("../models");

const carCtrl = {
  addProductToCart: (req, res) => {
    let newProduct = new Car({
      products: req.body.products,
      quantity: req.body.cant,
      address: req.body.address,
    });

    newProduct.save().then((prod) => {
      res.json(prod);
    });
  },

  findAllProductsInCart: (req, res) => {
    Car.find({}).then((prods) => {
      res.json(prods);
    });
  },

  deleteProductToCart: (req, res) => {
    const { id } = req.params;
    Car.findByIdAndRemove(id).then((result) => {
      res.status(204).end();
    });
  },

  updateProductToCart: (req, res) => {
    const { id } = req.params;

    const newCant = { quantity: req.body.cant };

    Car.findByIdAndUpdate(id, newCant, { new: true }).then((result) => {
      res.json(result);
    });
  },
};

module.exports = carCtrl;
