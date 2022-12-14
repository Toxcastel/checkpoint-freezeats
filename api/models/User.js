const { model, Schema } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//schema of users
const usersSchema = new Schema(
    {
        name: String,
        lastname: String,
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
        orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
        roles: [
            {
                ref: "Role",
                type: Schema.Types.ObjectId,
            },
        ],
    },
    { versionKey: false }
);

usersSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString().split('"')[0];
        delete returnedObject._id;
    },
});

usersSchema.pre("save", function () {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(this.password, salt).then((hash) => {
        this.password = hash;
    });
});

usersSchema.statics.login = function ({ email, password }) {
    console.log("soy el email: ", email)
    return this.findOne({ email: email }).then((user) => {
        if (user) {
            console.log("user en login: ", user)
            return bcrypt.compare(password, user.password).then((auth) => {
                if (auth) {
                    console.log("AUTH: ", auth)
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
