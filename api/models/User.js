const { model, Schema } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Role = require("./Role");

//schema of users
const usersSchema = new Schema(
    {
        name: String,
        lastName: String,
        email: {
            type: String,
            required: [true, "email required"],
            unique: true,
            lowerCase: true,
            validate: [isEmail, "enter valid email"],
        },
        password: {
            type: String,
            required: [true, "password required"],
        },
        addresses: [String],
        cellPhone: Number,
        favorites: [String],
        orderHistory: [String],
        role: {
            ref: "Role",
            type: Schema.Types.ObjectId,
        },
    },
    { versionKey: false }
);
/*----------------------------------------------
  --------------- AUTH HOOKS -------------------
  ---------------------------------------------- */

//Con este set lo que se hace es convertir la data que viene de la base, mas no la que se almacena
usersSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString().split('"')[0];
        delete returnedObject._id;
    },
});

// esto es para el hash. Antes de un evento 'save', dispara una función
// como estos son métodos de instacia, nos conviene usar el function regular y hacer el llamado a this
usersSchema.pre("save", function () {
    const salt = bcrypt.genSaltSync();
    return bcrypt
        .hash(this.password, salt)
        .then((hash) => {
            this.password = hash;
        })
        .then(() => {
            if (this.role) {
                return Role.findOne({ name: "admin" }).then((rol) => {
                    this.role = [rol._id];
                });
            } else {
                return Role.findOne({ name: "user" }).then((rol) => {
                    this.role = [rol._id];
                });
            }
        });
});

/*----------------------------------------------
  --------------- CLASS M -------------------
  ---------------------------------------------- */

// Método de clase para validar contraseña y manejo de errores
usersSchema.statics.login = function ({ email, password }) {
    return this.findOne({ email }).then((user) => {
        if (user) {
            return bcrypt.compare(password, user.password).then((auth) => {
                if (auth) {
                    return user;
                }
                throw Error("incorrect password");
            });
        }
        throw Error("incorrect email");
    });
};

const User = model("User", usersSchema);

module.exports = User;
