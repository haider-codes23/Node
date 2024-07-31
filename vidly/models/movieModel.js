const mongoose = require("mongoose");
const {Genre, genreSchema} = require('./genresModel')

// creating a Schema
const movieSchema = new mongoose.Schema({
  title: String,
  genre: genreSchema,
  numberInStock: Number,
  dailyRentalRate: Number
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;