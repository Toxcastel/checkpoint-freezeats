const { User, Role } = require("../models");
const { handleErrors } = require("../utils/auth.utils.js");

const adminCtrl = {
    getAdmin: (req, res) => {
        console.log("ENTRE A GETADMIN");
        console.log("QUE SOY: ", req.authRole);
        res.status(200).send(req.authRole);
    },

    updateUser: (req, res) => {
        const { email } = req.body;
        User.findOneAndUpdate(email, req.body, { new: true }).then((updated) =>
            res.json(updated)
        );
    },

    getUser: (req, res) => {
        User.findById(req.user)
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(401).json(err));
    },

    getAllUsers: (req, res) => {
        User.find({})
            .then((users) => {
                res.status(200).json(users);
            })
            .catch((err) => res.status(401).json(err));
    },

    getRoleById: (req, res) => {
        const { role } = req.params;
        console.log("ID ROLE: ", req.params);
        Role.findById(role)
            .then((role) => res.status(200).json(role))
            .catch((err) => res.status(401).json(err));
    },

    getRoles: (req, res) => {
        Role.find({})
            .then((role) => res.status(200).json(role))
            .catch((err) => res.status(401).json(err));
    },
};

module.exports = adminCtrl;
