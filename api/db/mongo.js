const mongoose = require("mongoose");
const password = require("../config/password");
const { Schema, model } = mongoose;

const connectionString = `mongodb+srv://CrisAlvarez:${password}@cluster0.vceyvwh.mongodb.net/Freezeats?retryWrites=true&w=majority`;

//conexion de mongodb
mongoose
    .connect(connectionString)
    .then(() => {
        console.log("Base de datos conectada");
    })
    .catch((err) => console.error(err));

//schema de users
const usersSchema = new Schema({
    Name: String,
    LastName: String,
    Age: Number,
});

//Modelo de users
const User = model("User", usersSchema);

//Usuario de prueba
// const user = new User({
//   Name: "Pepito",
//   LastName: "Perez",
//   Age: 18,
// });

//Crear un usuario
// user
//   .save()
//   .then((result) => {
//     console.log(result);
//     mongoose.connection.close();
//   })
//   .catch((err) => console.error(err));

//Encontrar todos
User.find({})
    .then((result) => {
        console.log(result);
        mongoose.connection.close();
    })
    .catch((err) => console.error(err));
