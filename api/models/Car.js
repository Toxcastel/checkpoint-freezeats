const { model, Schema } = require("mongoose");

//schema of Car
const carSchema = new Schema({
    Products: [],
    Address: String
},{versionKey:false});

//Revisar la referencia para el campo Products, debido a que puede crecer indefinidamente, o limitar desde el front

//Model of Car
const Car = model("Car", carSchema);

module.exports = Car