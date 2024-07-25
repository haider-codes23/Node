const express = require('express');
const Joi = require('joi');
const logger = require('./logger.js');
const helment = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbdebugger = require('debug')('app:db');
const courses  = require('./routes/courses.js');

const app = express();


// setting up view engine or templating engine
app.set('view engine', 'pug');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`NODE_ENV: ${app.get('env')}`);

// this enables the parsing of json object that we get from the request body
// express.json returns us the middleware that use in our app request processing pipeline
app.use(express.json());

//
app.use(express.urlencoded());

// middleware function for logging every request
app.use(logger);

app.use(helment());

//
app.use('/api/courses', courses);

// configuration
console.log(`Application Name: ${config.get('name')}`);  
console.log(`Mail server: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);




// This middle wear logs http request to the console
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger("Morgan Enabled");
}

// working with the DB
dbdebugger('Connected with the database');



app.get('/', (req, res) => {
  res.send('hello world!!!');

});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));



// app.post();
// app.put();
// app.delete();


