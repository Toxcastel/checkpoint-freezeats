const { User } = require("../models");

const userCtrl = {
  signIn: (req, res) => {
    const { Name, LastName, Password, Email } = req.body;
    let user = new User({
      Name,
      LastName,
      Password,
      Email,
    });
    user.save().then((user) => console.log(user));
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
    const newCant = { cant: req.body };
     console.log(req.body.cant)
    User.findOneAndUpdate(email, newCant, { new: true }).then((updated) =>
      res.json(updated)
    );
  },

  getUser: (req, res) => {
    const { id } = req.params.id;
    User.find(id).then((user) => res.json(user));
  },
};

module.exports = userCtrl;
