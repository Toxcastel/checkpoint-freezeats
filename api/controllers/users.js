const { User } = require("../models");
const handleErrors = require("../utils/auth.utils.js");

const userCtrl = {
  signIn: (req, res) => {
    const { email, password } = req.body;
    User.create({ email, password })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
      });
  },

  login: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
      if (!user) return res.sendStatus(401);
      console.log(user);
      //si el usuario existe debemos validar la password y generar un token.
    });
  },

  logout: (req, res) => {
    res.clearCookie();
    res.sendStatus(204);
  },

  updateUser: (req, res) => {
    const { email } = req.body;
    User.findOneAndUpdate(email, req.body, { new: true }).then((updated) =>
      res.json(updated)
    );
  },

  getUser: (req, res) => {
    const { id } = req.params.id;
    User.find(id).then((user) => res.json(user));
  },
};

module.exports = userCtrl;
