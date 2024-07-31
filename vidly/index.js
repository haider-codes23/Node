const express = require('express');
const Joi = require('joi');
const genre = require('./routes/genres');
const customer = require('./routes/customers');
const movie = require('./routes/movies');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(console.log("Connected To MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/genres', genre);
app.use('/api/customers', customer);
app.use('/api/movies', movie);




app.get('/', (req, res) => {
  res.send("Hello From vidly");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));