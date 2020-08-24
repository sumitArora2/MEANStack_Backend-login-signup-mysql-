const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken');
var bcrypt = require("bcryptjs");
const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

module.exports = {
  profile: async (req, res) => {
    try {
      var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

      let newUser = await User.findOne({
        where: {
          id: decoded.id
        }
      })
      if (newUser) {
        res.json(newUser)
      } else {
        res.send('User does not exist')
      }
    }
    catch (err) {
      res.send(err);
    }
  },
  register: async (req, res) => {
    try {
      const today = new Date()
      const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        college_name: req.body.college_name,
        created: today
      }

      let newUser = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!newUser) {
        let newUser = await User.create(userData)
        if (newUser) {
          return res.status(200).send({ message: "User Registered Successfully." })
        }
      }else{
        return res.status(404).send({ message: "User Already Exists." });
      }
    }
    catch (err) {
      res.send(err);
    }
  },
  login: async (req, res) => {
    try {
      if(!req.body.email || !req.body.password || !req.body.college_name){
        return res.status(404).send({ message: "All Fields are mandatory!" });
      }
      let newUser = await User.findOne({
        where: {
          email: req.body.email,
        }
      })
      if (newUser) {
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          newUser.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        else if(req.body.college_name!=newUser.college_name){
          return res.status(401).send({
            accessToken: null,
            message: "Wrong college name selected!"
          });
        }
        else {
          let token = jwt.sign(newUser.dataValues, process.env.SECRET_KEY, {
            expiresIn: 86400
          })
          res.json({ token: token })
        }
      } else {
        return res.status(404).send({ message: "User Not found." });
      }
    } catch (err) {
      res.send(err);
    }
  },

}