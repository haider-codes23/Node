const Joi = require("joi");
const express= require("express");
const mongoose = require("mongoose");
const Rental = require('../models/rentalModel');
const Customer = require('../models/customerModel');
const Movie = require('../models/movieModel');
const Fawn = require('fawn');

const router = express();

// Initializing fawn to implement transactions
//Fawn.init(mongoose);

// End point for getting all rentals
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort({dateOut: -1});
  res.send(rentals);
});

// Endpoint for creating a new rental
router.post('/', async (req, res) => {
  // validating the body of the request
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  });
  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error.message);
  
  // Then we ensure that the customerId client is sending us is a valid customerId
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send(`Customer with Id: ${req.body.customerId} was not found`);
  // Then we ensure that the movieId client is sending us is a valid movieId
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send(`Movie with the Id: ${req.body.movieId} was not found`);
  if (movie.numberInStock === 0) return res.status(400).send("Movie Not In Stock");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });
  rental = await rental.save();

  movie.numberInStock--;
  movie.save();
  res.send(rental);
  

  // movieID: 66a9d17258ecf73d55682032
  // customerId: 66a8bdddaf0e05f056558e9c
  

})


module.exports = router;