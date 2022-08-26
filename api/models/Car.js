const { model, Schema } = require("mongoose");

//schema of Car
const carSchema = new Schema(
  {
    products: [Object],
    address: String,
    user: String,
  },
  { versionKey: false }
);

//Revisar la referencia para el campo Products, debido a que puede crecer indefinidamente, o limitar desde el front

carSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString().split('"')[0];
    delete returnedObject._id;
  },
});

//Model of Car
const Car = model("Car", carSchema);

module.exports = Car;
