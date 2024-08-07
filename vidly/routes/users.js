const express = require('express');
const User = require('../models/userModel');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');

const router = express();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id)
  .select({name: 1, email: 1});
  res.send(user);
});

router.post('/', async (req, res) => {
  // first we validate the user name, email and password in the body of the request
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024)
  });
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  //next we need to validate that this user is not a already registered user
  // So we need to look up the collection of users with an email for this we will use findOne() method
  // we pass findOne a query object
  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("User already Registered");


  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  // hashing the password with bcrypt library 
  const salt =  await bcrypt.genSalt(10);
  user.password  = await bcrypt.hash(user.password, salt);

  user = await user.save();

  res.send({
    name: user.name,
    email: user.email
  });
});



module.exports = router;