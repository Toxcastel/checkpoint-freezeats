const handleErrors = (err) => {
    let errors = { email: "", password: "" };

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

module.exports = handleErrors;