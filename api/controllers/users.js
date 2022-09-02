const { generateToken, generateAdmin } = require("../config/tokens");
const { User, Role } = require("../models");
const { handleErrors } = require("../utils/auth.utils.js");
const maxAge = 24 * 60 * 60 * 1000;

const userCtrl = {
    signup: async (req, res) => {
        const { email, password, name, lastname, roles } = req.body;
        try {
            let returnRoles;
            if (roles) {
                const foundRoles = await Role.find({ name: { $in: roles } });
                returnRoles = foundRoles.map((role) => role._id);
            } else {
                const userRol = await Role.find({ name: "user" });
                returnRoles = [userRol[0]._id];
            }
            await User.create({
                email,
                password,
                name,
                lastname,
                roles: returnRoles,
            });
            res.status(201).json({
                message: `User has been created`,
            });
        } catch (error) {
            const errors = handleErrors(error);
            res.status(400).json({ errors });
        }
    },

    login: async (req, res) => {
        console.log("que llega: ", req.body)
        try {
            const user = await User.login(req.body);
            console.log("user: ", user)
            const rol = await Role.findById(user.roles[0]);
            console.log("rol: ", rol)
            res.cookie("jwt", generateToken(user._id), {
                httpOnly: true,
                maxAge,
            });
            if (rol.name === "admin") {
                res.cookie("role", generateAdmin(rol._id), {
                    httpOnly: true,
                    maxAge,
                });
            }
            res.status(200).json({ user });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    },

    logout: (req, res) => {
        res.clearCookie("jwt");
        res.clearCookie("role");
        res.sendStatus(204);
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

};

module.exports = userCtrl;
