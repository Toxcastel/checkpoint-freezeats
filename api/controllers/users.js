const { User } = require("../models");
const mongoose = require("mongoose")

const signIn = (req, res) => {
  let user = new User(req.body);

  user.save((err, usr) => {
    if (err) return res.status(401).json(err.message);
    res.sendStatus(201);
  });
};

const login = (req, res) => {
    const {email, password} = req.body
  User.findOne({email: email})
  .then((user)=> {
    if(!user) return res.sendStatus(401);
    //si el usuario existe debemos validar la password y generar un token. 
  })
};

const logout= (req, res)=>{
  res.clearCookie()
  res.sendStatus(204)
}

const updateUser =(req, res)=>{
 const {email} = req.body
 const newCant = {cant : req.body.cant}

User.findOneAndUpdate(email, newCant, {new: true})
.then((updated)=> res.json(updated))
}

const getUser=(req,res)=>{
    User.find(req.body.email)
    .then((user)=> res.json(user))
}


module.exports = { signIn, login, logout, updateUser, getUser };
