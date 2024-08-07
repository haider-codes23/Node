const express = require('express');
const Joi = require('joi');
const genre = require('./routes/genres');
const customer = require('./routes/customers');
const movie = require('./routes/movies');
const rental = require('./routes/rentals');
const user = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');
const mongoose = require('mongoose');
const config = require("config");
const winston = require("winston");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal Error: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
  .then(console.log("Connected To MongoDB"))
  .catch((err) => console.log(err));


app.use(express.json());

app.use('/api/genres', genre);
app.use('/api/customers', customer);
app.use('/api/movies', movie);
app.use('/api/rentals', rental);
app.use('/api/users', user);
app.use('/api/auth', auth);

app.use(error);


app.get('/', (req, res) => {
  res.send("Hello From vidly");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));