const express = require('express');
const Joi = require('joi');

const router = express();

const courses = [
  {id: 1, name: 'Javascript'},
  {id: 2, name: 'Node'},
  {id: 3, name: 'React'},

];

router.get('/', (req, res) => {
  // in real world sceniro we want to get list of courses from the database and return them
  // but becasue we are not using a database we will return an array containing numbers 
  res.send(courses);

});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with the given id was not found");
  res.send(course);
});


router.post('/', (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  const result = schema.validate(req.body);
  
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  } 

  // if (!req.body.name) {
  //   res.status(400).send("Name is required");
  //   return;
  // } else if (req.body.name.length < 3) {
  //   res.status(400).send("Name of course must be atleat 3 character long");
  //   return; 
  // }

  const course =  {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});


router.put('/:id', (req, res) => {
  // look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  // if not existing, return 404
  if (!course) res.status(404).send("Course not found");

  // validate the things that the client wants to update
  // if invalid, return 400 -- Bad request
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }

  // update course
  // return the update course as response to the client
  course.name = req.body.name;
  res.send(course);
});


router.delete('/:id', (req, res) => {
  // look up the course
  // if not existing return error code 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course not found");

  // delete
  // first we need to find the index of the course with the route param id
  const index = courses.indexOf(course);
  courses.splice(index, 1);


  // return the deleted course
  res.send(course);
});

module.exports = router