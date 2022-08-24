const { model, Schema } = require("mongoose");

//schema of Payment
const paymentSchema = new Schema({
    Method: String,
    Info: String
},{versionKey:false});

//Model of Payment
const Payment = model("Payment", paymentSchema);

module.exports = Payment