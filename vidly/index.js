const express = require('express');
const Joi = require('joi');
const genre = require('./routes/genres');

const app = express();

app.use(express.json());

app.use('/api/genres', genre);




app.get('/', (req, res) => {
  res.send("Hello From vidly");
});

// Setting an endpoint for getting all genres
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));