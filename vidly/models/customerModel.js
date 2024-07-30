const mongoose = require('mongoose');
const Joi = require('joi');

// define a schema for customers
const customerSchema = new mongoose.Schema({ 
  isGold: {type: Boolean, default: false}, 
  name: {type: String, required: true, minlength: 5, maxlength: 50},
  phone: {type: String, required: true, minlength: 5, maxlength: 50}
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;