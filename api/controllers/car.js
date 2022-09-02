const { Car, User, Product } = require("../models");

const carCtrl = {

    addProductToCart: (req, res) => {
        const { products } = req.body;
        Car.findOne({ user: req.user }).then((prods) => {
            if (!prods) {
                User.findById(req.user).then((user) => {
                    let newProduct = new Car({
                        products,
                        user: user.id,
                    });
                    newProduct.save().then((prod) => {
                        res.json(prod);
                    });
                });
            } else {
                const prod = prods.products.concat(products);
                Car.findByIdAndUpdate(
                    prods.id,
                    { products: prod },
                    { new: true }
                ).then((result) => {
                    res.json(result);
                });
            }

        });
    },

    findCartByUser: (req, res) => {
        const id = req.user;
        Car.findOne({ user: id }).then((prods) => {
            let resp = { products: [], address: null, user: null, id: null };
            if (prods) {
                resp = {
                    products: prods.products,
                    address: prods.address,
                    user: prods.user,
                    id: prods._id,
                };
            }
            res.json(resp);
        });
    },

    deleteProductToCart: (req, res) => {
        const { productid, cartid } = req.headers;
        Car.findById(cartid).then((cart) => {
            const newCart = cart.products.filter(
                (prod) => prod.id !== productid
            );
            cart.products = newCart;
            cart.save();
            res.json(cart);
        });
    },

    updateProductToCart: async (req, res) => {
        const { cartId, productid, quantity } = req.body;
        const product = await Product.findById(productid);
        const stock = product.stock;
        if (quantity > stock) {
            res.status(200).json({
                ok: false,
                errorMessage: "No hay suficiente stock",
            });
            return;
        }

        if (quantity < 1) {
            res.status(200).json({
                ok: false,
                errorMessage: "Cantidad mínima de compra 1 unidad",
            });
        } else {
            const cart = await Car.findOneAndUpdate(
                { _id: cartId },
                { $set: { "products.$[elem].quantity": quantity } },
                { arrayFilters: [{ "elem.id": productid }], new: true }
            );
            res.json({ cart, ok: true });
        }
    },
};

module.exports = carCtrl;
