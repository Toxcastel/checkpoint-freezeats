const { model, Schema } = require("mongoose");

//schema of Payment
const paymentSchema = new Schema({
    method: String,
    info: [String]
},{versionKey:false});

paymentSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString().split('"')[0]
      delete returnedObject._id;
    },
  });

//Model of Payment
const Payment = model("Payment", paymentSchema);

module.exports = Payment