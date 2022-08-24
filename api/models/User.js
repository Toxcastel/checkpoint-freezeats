const { model, Schema } = require("mongoose");

//schema of users
const usersSchema = new Schema(
  {
    name: String,
    lastName: String,
    password: String,
    email: String,
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
    returnedObject.id = returnedObject._id.toString().split('"')[0]
    delete returnedObject._id;
  },
});

//Modelo of users
const User = model("User", usersSchema);

module.exports = User;
