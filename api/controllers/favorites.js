const { User, Product } = require("../models");

const favCtrl = {
  addFavorite: (req, res) => {
    const userId = req.user;
    const productId = req.body.id;
    Product.findById({ _id: productId }).then((product) => {
      User.findById(userId)
        .then((user) => {
          user.favorites = user.favorites.concat(product.id);
          user.save();
          res.json(product);
        })
        .catch((err) => console.log(err));
    });
  },

  removeFavorite: (req, res) => {
    const userId = req.user;
    const productId = req.body.id;
    User.findById(userId).then((user) => {
      user.favorites = user.favorites.pull(productId);
      user.save();
      res.json(user);
    });
  },

  getFavorites: (req, res) => {
    const userId = req.user;
    User.findById(userId).then((user) => {
      res.json(user.favorites);
    });
  },
};

module.exports = favCtrl;

/* removeFavorite: (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.id;
    User.findById(userId).then((user) => {
      const newFavorites= user.favorites.filter((fav)=> fav !== productId) 
       user.favorites = newFavorites
        user.save();
        res.json(user);
      })
  } */
