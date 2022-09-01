const Product = require("../models/Products");

const prodCtrl = {

  getProducts: async (req, res) => {
    console.log("PIDIERON PRODUCTS? BACK: ", req.body)
    const products = await Product.find();
    res.send(products);
  },
  getProductsByCategory: async (req, res) => {
    const category = req.params.category;
    console.log("category", category);
    const products = await Product.find({ category });
    res.send(products);
  },
  getProductByName: async (req, res) => {
    const {name} = req.params
    const product = await Product.find({ name:{$regex:name.toLowerCase()} });
    res.send(product);
  },
  getOneProduct: async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });
    res.send(product);
  },
  postProduct: async (req, res) => {
    const { name, description, stock, price, category, rating } = req.body;
    const product = new Product({
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
