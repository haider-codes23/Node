const mongoose = require("mongoose");
const express = require('express');
const {Genre, genreSchema} = require('../models/genresModel')
const Joi = require('joi');

// creating a Schema
const movieSchema = new mongoose.Schema({
  title: String,
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number
});

const Movie = mongoose.model('movie', movieSchema);

const router = express();

// End point for getting all movies from MongoDB database
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  console.log(movies);
  res.send(movies);
});

//End point for creating a movie
router.post('/', async(req, res) => {
  const schema = Joi.object({
    title: Joi.string(),
    genre: Joi.object(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
  });
  const result = schema.validate();
  if(result.error) return res.status(400).send(result.error.message);

  let movie = Movie({
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

  const result = schema.validate();
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

module.exports = router;