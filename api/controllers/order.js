const { Car, Order, User } = require("../models");

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
  }
};



module.exports = orderCtrl;
