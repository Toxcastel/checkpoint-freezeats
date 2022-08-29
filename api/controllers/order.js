const { Car, Order, User } = require("../models");
const { CLIENT_ID, SECRET_CLIENT, REFRESH_TOKEN, REDIRECT_URI } = require("../config/index.js");
const nodemailer = require("nodemailer")
const {google} = require("googleapis");


const orderCtrl = {
  addOrder: (req, res) => {
    const id = req.headers.id;
    Car.find({ user: id }).then((prods) => {
        User.findById(id).then((user) => {
          let newOrder = new Order({
            info: prods,
            user: id,
          });
          newOrder.save().then((order) => {
           user.orderHistory = user.orderHistory.concat(order._id)
           user.save()
            res.json(order);
          });
        });
      });
  },

  findAllOrder: (req,res)=> {
    const id = req.headers.id;
    Order.find({user: id}).then((order)=>{
        res.json(order)
    })
  },

  orderFullfiled: (req,res)=>{
    const id = req.headers.id;
    Order.findOneAndUpdate({user: id}, {state:"Fullfiled"}).then((order)=>{
        order.save()
        res.json(order)
        User.findById(id).then((user)=>{
          const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,SECRET_CLIENT,REDIRECT_URI)
          oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

          async function sendMail(){
            try{
              const accesToken = await oAuth2Client.getAccessToken()
              const transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                  type:"OAuth2",
                  user:"freezeatec@gmail.com",
                  clientId:CLIENT_ID,
                  clientSecret:SECRET_CLIENT,
                  refreshToken:REFRESH_TOKEN,
                  accessToken: accesToken,
                },
              });
              const mailOptions = {
                  from:"FreezEat <freezeatec@gmail.com>",
                  to:"ste.aymar@gmail.com",
                  subject: `Orden de compra ${order._id} confirmada`,
                  html: "<h1>GRACIAS POR COMPRAR EN FREEZEAT</h1>"
              };
              const result = await transporter.sendMail(mailOptions);
              return result
            }
            catch(err){
              console.log(err)
            }
          } 
          sendMail()
          .then((result) => res.status(200).send("email enviado"))
          .catch((error)=> console.log(error.message))

        })
    })
  },

  orderRejected: (req,res)=>{
    const id = req.headers.id;
    Order.findOneAndUpdate({user: id}, {state:"Rejected"}).then((order)=>{
        order.save()
        res.json(order)
    })
  },

};



module.exports = orderCtrl;
