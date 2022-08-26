const { Car, User } = require("../models");

const carCtrl = {
  
  addProductToCart: (req, res) => {
    const { products, address, userId } = req.body;
    Car.find({ user: userId }).then((prods) => {
      if (prods.length == 0) {
        User.findById(userId).then((user) => {
          let newProduct = new Car({
            products,
            address,
            user: user.id,
          });

          newProduct.save().then((prod) => {
            res.json(prod);
          });
        });
      } else {
        const prod = prods[0].products.concat(products);
        Car.findByIdAndUpdate(
          prods[0].id,
          { products: prod },
          { new: true }
        ).then((result) => {
          res.json(result);
        });
      }
    });
  },

  findAllProductsInCart: (req, res) => {
    const id = req.headers.id;
    Car.find({ user: id }).then((prods) => {
      res.json(prods);
    });
  },

  deleteProductToCart: (req, res) => {
    const { id, productid } = req.headers;
    Car.findById(id).then((cart) => {
      const newCart = cart.products.filter((prod) => prod.id !== productid);
      cart.products = newCart;
      cart.save();
      res.json(cart);
    });
  },

  updateProductToCart: (req, res) => {
    const { quantity } = req.body;
    const { id, productid } = req.headers;
    Car.findById(id).then((cart) => {
      cart.products.map((prod) => {
        if (prod.id === productid) {
          prod.quantity = quantity;
        }
      });
      cart.save();
      res.json(cart);
    });
  },

};

module.exports = carCtrl;
