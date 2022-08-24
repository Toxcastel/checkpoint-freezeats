const { model, Schema } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
        salt: String,
        addresses: [String],
        cellPhone: Number,
        favorites: String,
        menus: String,
        orderHistory: [String],
        role: String,
    },
    { versionKey: false }
);

//Revisar como hacer la referencia para OrderHistory,Favaorites,Menus,Addresses
//Con este set lo que se hace es convertir la data que viene de la base, mas no la que se almacena
usersSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString().split('"')[0];
        delete returnedObject._id;
    },
});

/*----------------------------------------------
  --------------- AUTH HOOKS -------------------
  ---------------------------------------------- */

// esto es para el hash. Después de un evento 'save', dispara una función
// como estos son métodos de instacia, nos conviene usar el function regular y hacer el llamado a this
usersSchema.pre("save", function () {
    const salt = bcrypt.genSaltSync();
    this.salt = salt;
    return bcrypt.hash(this.password, salt).then((hash) => {
        this.password = hash;
    });
});

//Modelo of users
const User = model("User", usersSchema);

module.exports = User;
