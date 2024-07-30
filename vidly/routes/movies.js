const mongoose = require("mongoose");
const {Genre, genreSchema} = require('../models/genresModel')

// creating a Schema
const movieSchema = new mongoose.Schema({
  title: String,
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number
});

