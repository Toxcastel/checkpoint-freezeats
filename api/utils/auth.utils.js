const Role = require("../models/Role");

const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "incorrect email") {
        errors.email = "email is not registered";
    }

    if (err.message === "incorrect password") {
        errors.password = "password is incorrect";
    }
    // valida si el correo ya existe
    if (err.code === 11000) {
        errors.email = "email already in use";
        return errors;
    }

    // estos son errores de validación, en caso que no hayan ingresado algo correctamente
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

const createRoles = () => {
    Role.estimatedDocumentCount()
        .then((count) => {
            if (count > 0) return;
            return Promise.all([
                Role.create({ name: "user" }),
                Role.create({ name: "admin" }),
            ]).then((values) => console.log("Roles creados: ", values));
        })
        .catch((err) => console.error("Roles no creados: ", err));
};

module.exports = { handleErrors, createRoles };
