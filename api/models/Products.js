const { model, Schema } = require("mongoose");

//schema of Product
const productsSchema = new Schema({
    Name: String,
    Description: String,
    Stock: Number,
    Price: Number,
    Category: [String],
    Rating: Number
},{versionKey:false});

//Revisar si el rating se va hacer en base a una calificacion numerica ?

//Model of Product
const Product = model("Product", productsSchema);

module.exports = Product