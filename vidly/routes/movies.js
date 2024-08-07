const mongoose = require("mongoose");
const express = require('express');
const Movie = require("../models/movieModel");
const Joi = require('joi');


const router = express();

// End point for getting all movies from MongoDB database
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  console.log(movies);
  res.send(movies);
});

//endpoint for getting a movie using ID
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send(`Movie with ID: ${req.params.id} not found`);
  res.send(movie);
})

//End point for creating a movie
router.post('/', async(req, res) => {
  const schema = Joi.object({
    title: Joi.string(),
    genre: Joi.object(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  });
  const result = schema.validate(req.body);
  if(result.error) return res.status(400).send(result.error.message);

  let movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);

});

// Endpoint for updating a movie using ID
router.put('/:id', async (req, res) => {
  const schema = Joi.object({
    title: Joi.string(),
    genre: Joi.object(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  });

  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: req.body.genre,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  }, {new: true});

  if (!movie) return res.status(404).send(`Movie with ID: ${req.params.id} not found`);
  res.send(movie);
});

// Endpoint for deleting a movie
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send(`The Movie with ID: ${req.parmas.id} was not found`);
  res.send(movie);
})



module.exports = router;