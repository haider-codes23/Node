// loading express into module
const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const {Genre, genreSchema} = require('../models/genresModel');
const auth = require('../middleware/auth');
const error = require('../middleware/error');
const { exceptions } = require('winston');

// this returns a router object 
const router = express();


function asyncMiddleware(routeHandler) {
  return (req, res, next) => {
    try {
      //.. execute the route handler code which will vary from one route
      // handler to another
      routeHandler(req, res, next);
    } catch (exception) {
      next(exception);
    }

  }
};


// Setting an endpoint for getting all genres
router.get('/',async (req, res, next) => {
  try{

    throw new Error("Could not get the Genres");
  } catch (exception) {
    next(exception);
  }
  

  // const result = await Genre
  // .find()
  // .sort({name: 1});
  // res.send(result);
  
});

// setting an endpoint for creating a Genre
router.post('/', auth, async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
  });

  const result = schema.validate(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  
  res.send(genre);
  
  // firstly we need to validate the name of the genre sent by the client in the req body
  // For this we need to create a schema first
  // const schema = Joi.object({
  //   name: Joi.string().min(3).required()
  // });

  // const result = schema.validate(req.body);
  
  // if there is an erro we are going to handle it
  // if (result.error) {
  //   res.status(400).send(result.error.message);
  // }
  // // secondly we need to create a genres object, assign it an id by incrementing the length
  // const genre = {
  //   id: genres.length + 1,
  //   // then assign it a name using the object called req which has an object by the name of body, which contains an property called name
  //   // Here the middleware function called express.json() is used e.g. if the body of the request contains a json object it would parse
  //   // the body of the request into a json object and then it would 
  //   name: req.body.name
  // };
  // genres.push(genre);
  // res.send(genre);
});

//setting up an endpoint to get a genres by id
router.get('/:id',async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    res.status(404).send(`Cannot find the genre with id: ${id}`);
  };

  res.send(genre);


  // // we need to look up the genre in the genres array that has the same id as that of the request params
  // const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  // // check if genre exists other wise send a error code of 404
  // if (!genre) {
  //   res.status(404).send(`Cannot find the genre with id: ${id}`);
  // }
  // res.send(genre);
});


// Setting up an endpoint for updating a genre
router.put('/:id', async (req, res) => {
  //validate the name of the genre in the body of the request
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  };

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true}); 



  // // Firstly we need to look up the genre
  // const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send(`Genre with the id: ${req.params.id} not found`);
    
  };
  res.send(genre);

  // // validate the name of the genre in the body of the request
  // const schema = Joi.object({
    //   name: Joi.string().min(3).required()
    // });
    // const result = schema.validate(req.body);
    //  // if there is an erro we are going to handle it
    //  if (result.error) {
      //   res.status(400).send(result.error.message);
      //   return;
      // };
      // genre.name = req.body.name;
      // res.send(genre);
      
});

// setting up endpoint for deleteing a genre
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
      res.status(404).send(`Genre with id: ${req.params.id} not found`);
      return;
    };
  res.send(genre);


  // locate the genre with this index in the request params
  // const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  // if (!genre) {
  //   res.status(404).send(`Genre with id: ${req.params.id} not found`);
  //   return;
  // }
  // const index = genres.indexOf(genre);
  // genres.splice(index, 1);
  // res.send(genre);
});


// export this router module
module.exports = router;