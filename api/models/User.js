const { model, Schema } = require("mongoose");

//schema of users
const usersSchema = new Schema(
  {
    Name: String,
    LastName: String,
    Password: String,
    Email: String,
    Addresses: [String],
    CellPhone: Number,
    Favorites: String,
    Menus: String,
    OrderHistory: [String],
    Role: String,
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
