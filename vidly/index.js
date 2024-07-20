const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

let genres = [
  {id: 1, name: "Action"},
  {id: 2, name: "horror"},
  {id: 3, name: "Drama"},
  {id: 4, name: "Comedy"},
];


app.get('/', (req, res) => {
  res.send("Hello From vidly");
})
// Setting an endpoint for getting all genres
app.get('/api/genres', (req, res) => {
  res.send(genres);
})

//setting up an endpoint to get a genres by id
app.get('/api/genres/:id', (req, res) => {
  // we need to look up the genre in the genres array that has the same id as that of the request params
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  // check if genre exists other wise send a error code of 404
  if (!genre) {
    res.status(404).send(`Cannot find the genre with id: ${id}`);
  }
  res.send(genre);
});

// setting an endpoint for creating a Genre
app.post('/api/genres', (req, res) => {
  // firstly we need to validate the name of the genre sent by the client in the req body
  // For this we need to create a schema first
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  const result = schema.validate(req.body);
  
  // if there is an erro we are going to handle it
  if (result.error) {
    res.status(400).send(result.error.message);
  }
  // secondly we need to create a genres object, assign it an id by incrementing the length
  const genre = {
    id: genres.length + 1,
    // then assign it a name using the object called req which has an object by the name of body, which contains an property called name
    // Here the middleware function called express.json() is used e.g. if the body of the request contains a json object it would parse
    // the body of the request into a json object and then it would 
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

// Setting up an endpoint for updating a genre
app.put('/api/genres/:id', (req, res) => {
  // Firstly we need to look up the genre
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send(`Genre with the id: ${req.params.id} not found`);
    return;
  }

  // validate the name of the genre in the body of the request
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  const result = schema.validate(req.body);
   // if there is an erro we are going to handle it
   if (result.error) {
    res.status(400).send(result.error.message);
    return;
  };
  genre.name = req.body.name;
  res.send(genre);

});

// setting up endpoint for deleteing a genre
app.delete('/api/genres/:id', (req, res) => {
  // locate the genre with this index in the request params
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send(`Genre with id: ${req.params.id} not found`);
    return;
  }
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));