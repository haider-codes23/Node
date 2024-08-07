const express = require('express');
const User = require('../models/userModel');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post('/', async (req, res) => {
  // first we validate the user name, email and password in the body of the request
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required()
  });
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error.message);


  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("Invalid email or password");


  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Pasword");

  const token = jwt.sign({_id: user._id}, config.get("jwtPrivateKey"));
  res.send(token);
});



module.exports = router;