const { Car, Order, User } = require("../models");
const {
    CLIENT_ID,
    SECRET_CLIENT,
    REFRESH_TOKEN,
    REDIRECT_URI,
} = require("../config/index.js");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const orderCtrl = {
    addOrder: (req, res) => {
        const id = req.user;
        const { total } = req.body;
        Car.findOne({ user: id }).then((prods) => {
            const products = prods.products;
            User.findById(id).then((user) => {
                let newOrder = new Order({
                    info: products,
                    user: id,
                    total,
                });
                newOrder.save().then((order) => {
                    user.orderHistory = user.orderHistory.concat(order._id);
                    user.save();
                    res.json(order);
                });
            });
        });
    },

    findAllOrder: (req, res) => {
        Order.find({ user: req.user }).then((order) => {
            res.status(200).send(order);
        });
    },

    findUserOrders: (req, res) => {
        const { id } = req.headers;
        console.log("soy el req user en order: ", id);
        Order.find({ user: id }).then((order) => {
            res.status(200).send(order);
        });
    },

    findOrder: (req, res) => {
        const { id } = req.user;
        Order.findOne({ user: id }).then((order) => {
            let resp = {
                info: [],
                total: null,
                user: "",
                paymentMethod: "",
                shipping: "",
                address: {
                    street: "",
                    number: null,
                    city: "",
                    province: "",
                    postalCode: null,
                },
            };
            if (order) {
                resp = {
                    info: order.info,
                    total: order.total,
                    user: order.user,
                    paymentMethod: order.paymentMethod,
                    shipping: order.shipping,
                    address: order.address,
                };
            }
            res.status(200).send(resp);
        });
    },

    orderFullfiled: (req, res) => {
        const id = req.user;
        Order.findOne({ user: id }).then((order) => {
            order.state = "Fullfiled";
            order.save().then();
            res.json(order);
            User.findById(id).then((user) => {
                const oAuth2Client = new google.auth.OAuth2(
                    CLIENT_ID,
                    SECRET_CLIENT,
                    REDIRECT_URI
                );
                oAuth2Client.setCredentials({
                    refresh_token: REFRESH_TOKEN,
                });

                async function sendMail() {
                    try {
                        const accesToken = await oAuth2Client.getAccessToken();
                        const transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                type: "OAuth2",
                                user: "freezeatec@gmail.com",
                                clientId: CLIENT_ID,
                                clientSecret: SECRET_CLIENT,
                                refreshToken: REFRESH_TOKEN,
                                accessToken: accesToken,
                            },
                        });
                        const mailOptions = {
                            from: "FreezEat <freezeatec@gmail.com>",
                            to: "ste.aymar@gmail.com",
                            subject: `Orden de compra ${order._id} confirmada`,
                            html: "<h1>GRACIAS POR COMPRAR EN FREEZEAT</h1>",
                        };
                        const result = await transporter.sendMail(mailOptions);
                        return result;
                    } catch (err) {
                        console.log(err);
                    }
                }
                sendMail()
                    .then((result) => res.status(200).send("email enviado"))
                    .catch((error) => console.log(error.message));
            });
        });
    },

    orderRejected: (req, res) => {
        const id = req.user;
        Order.findOneAndUpdate({ user: id }, { state: "Rejected" }).then(
            (order) => {
                order.save().then();
                res.json(order);
            }
        );
    },

    orderShippingMethod: (req, res) => {
        const id = req.user;
        const { shippingMethod } = req.body;
        Order.findOneAndUpdate(
            { user: id },
            { shipping: shippingMethod },
            { new: true }
        ).then((order) => {
            order.save().then();
            res.json(order);
        });
    },

    orderPaymentMethod: (req, res) => {
        const id = req.user;
        const { paymentMethod } = req.body;
        Order.findOneAndUpdate(
            { user: id },
            { paymentMethod },
            { new: true }
        ).then((order) => {
            order.save().then();
            res.json(order);
        });
    },

    orderAddress: (req, res) => {
        const id = req.user;
        Order.findOne({ user: id }).then((order) => {
            order.address = req.body;
            order.save().then();
            res.json(order);
        });
    },
};

module.exports = orderCtrl;
