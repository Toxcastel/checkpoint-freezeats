const { model, Schema } = require("mongoose");

//schema of Product
const productsSchema = new Schema({
    name: String,
    description: String,
    stock: Number,
    price: Number,
    category: [String],
    rating: Number
},{versionKey:false});

//Revisar si el rating se va hacer en base a una calificacion numerica ?

//Model of Product
const Product = model("Product", productsSchema);

module.exports = Product