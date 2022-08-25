const { generateToken } = require("../config/tokens");
const { User } = require("../models");
const handleErrors = require("../utils/auth.utils.js");
const maxAge = 24 * 60 * 60 * 1000;

const userCtrl = {
    signIn: (req, res) => {
        const { email, password } = req.body;
        User.create({ email, password })
            .then((user) => {
                res.cookie("jwt", generateToken(user._id), {
                    httpOnly: true,
                    maxAge,
                });
                res.status(201).json({ user: user._id });
            })
            .catch((err) => {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
            });
    },

    login: (req, res) => {
        const { email, password } = req.body;
        User.login(email, password)
            .then((user) => {
                res.cookie("jwt", generateToken(user._id), {
                    httpOnly: true,
                    maxAge,
                });
                res.status(200).json({ user: user._id });
            })
            .catch((err) => {
                const errors = handleErrors(err);
                res.status(400).json({ errors });
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
