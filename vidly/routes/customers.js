const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const Customer = require('../models/customerModel'); 

// this returns a router object 
const router = express.Router();

// Endpoint for getting all the customers from the mongoDb database
router.get('/',async (req, res) => {
  const genres = await Customer.find().sort({name: 1});
  res.send(genres);
});

//Endpoint for getting a single customer using id
router.get('/:id', async (Req, res) => { 
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send(`customer with id: ${req.params.id} not found`);
  res.send(customer);
});

//End point for creating a new customer
router.post('/', async (req, res) => {
  //create a schema for JOI
  const schema = Joi.object({
    isGold: Joi.boolean() ,
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required()
  });
  const result = schema.validate(req.body);
  if(result.error) return res.send(400).send(result.error.message);

  let customer = Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  customer = await customer.save();
  res.send(customer);
});

//Endpoint for updating a customer
router.put('/:id', async (req, res) => {
  //validate the properties in the name of the request
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().required().min(5).max(50),
    phone: Joi.string().required().min(5).max(50)
  });

  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone 
  }, {new: true});

  if (!customer) return res.status(404).send(`customer with id: ${req.params.id} not found`);
  res.send(customer);
});

// Endpoint for deleting a customer
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if(!customer) return res.status(404).send(`customer with id: ${req.params.id} not found`);
  res.send(customer);
})


module.exports = router;