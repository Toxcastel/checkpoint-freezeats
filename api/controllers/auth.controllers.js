const User = require("../models/User");

const getSignUp = (req, res) => {};

const getLogIn = (req, res) => {
    res.sendStatus(200);
};

const postSignUp = (req, res) => {
    const { email, password } = req.body;
    User.create({ email, password })
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => console.error("user not created: ", err));
};

const postLogIn = (req, res) => {
    const { email, password } = req.body;
    res.status(200).send(req.body);
};

module.exports = {
    getSignUp,
    getLogIn,
    postLogIn,
    postSignUp,
};
