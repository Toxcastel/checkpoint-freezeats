const { User, Role } = require("../models");

const adminCtrl = {
    getAdmin: (req, res) => {
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
        Role.findById(role)
            .then((role) => res.status(200).json(role))
            .catch((err) => res.status(401).json(err));
    },

    getRoles: (req, res) => {
        Role.find({})
            .then((role) => res.status(200).json(role))
            .catch((err) => res.status(401).json(err));
    },

    changeRole: async (req, res) => {
        const { id } = req.params;
        let { roleName } = req.body;

        if (roleName === "user") {
            roleName = "admin";
        } else {
            roleName = "user";
        }

        const role = await Role.find({ name: roleName });
        const findAndUpdate = await User.findOneAndUpdate(
            { _id: id },
            { roles: role }
        );
        // este console es la versión que encontró
        const user = await User.findOne({ _id: id });
        console.log("user actualizado: ", user);
        res.status(204).json(findAndUpdate);
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        const deletedUser = await User.deleteOne({ _id: id });
        res.status(200).json(deletedUser);
    },
};

module.exports = adminCtrl;
