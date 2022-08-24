const { model, Schema } = require("mongoose");

//schema of Order
const orderSchema = new Schema({
    Order: [Object]
},{versionKey:false});


orderSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString().split('"')[0]
      delete returnedObject._id;
    },
  });

//Model of Order
const Order = model("Order", orderSchema);

module.exports = Order