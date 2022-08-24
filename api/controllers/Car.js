const mongoose = require("mongoose");
const {Car} = require("../models")



const addProductToCart = (req,res) =>{
    let newProduct = new Car({
        Products: req.body.products,
        Quant: req.body.cant,
        Address: req.body.address
    })

    newProduct.save().then((prod) => {
        res.json(prod)
    })
}

const findAllProductsInCart = (req,res) =>{
    Car.find({}).then((prods)=>{
        res.json(prods)
    })
}

const deleteProductToCart = (req,res) =>{
    const {id} = req.params;
    Car.findByIdAndRemove(id).then((result)=>{
        res.status(204).end()
    })

}

const updateProductToCart = (req,res) =>{
    const {id} = req.params;

    const newCant = {Quant:req.body.cant}

    Car.findByIdAndUpdate(id, newCant, {new:true}).then((result)=>{
        res.json(result)
    })

}

module.exports = {addProductToCart, findAllProductsInCart, deleteProductToCart, updateProductToCart}