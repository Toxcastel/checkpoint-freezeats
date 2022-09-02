const { model, Schema } = require("mongoose");

//schema of Order
const orderSchema = new Schema(
  {
    info: Array,
    state: {
      type: String,
      default: "Pending",
    },
    user: String,
    total: Number,
    user: String,
    paymentMethod: {
      type: String,
      default: "efectivo"},
    shipping: {
      type: String,
      default: "Retiro en sucursal"},
    address: {
      type:{street: String, number: Number, city: String, province: String, postalCode: Number},
      default: {street: "", number: null, city: "", province: "", postalCode: null}
    },

  },
  { versionKey: false }
);

orderSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString().split('"')[0];
    delete returnedObject._id;
  },
});

//Model of Order
const Order = model("Order", orderSchema);

module.exports = Order;
