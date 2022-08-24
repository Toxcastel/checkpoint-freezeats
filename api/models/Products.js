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

productsSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString().split('"')[0]
      delete returnedObject._id;
    },
  });

//Model of Product
const Product = model("Product", productsSchema);

module.exports = Product