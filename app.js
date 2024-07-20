const logger = require('./logger.js');
const path = require('path');
const os = require('os') ;

// this returns us a class
const EventEmitter = require('events');

var pathObj = path.parse(__filename);
console.log(pathObj);

var osTotalmem = os.totalmem();
var osFreemem = os.freemem();

console.log(osTotalmem, osFreemem);

// we use the class to create an instance of the EventEmitter
const emitter = new EventEmitter();
// Registering a listener -- a listener is function that will be called when a specific event e.g mesagelogged is raised
// addListener takes two arguments, the name of event and a callback function
emitter.addListener('messagelogged', function() {
  console.log('listener called');
});


// now the instance has a method called emit to signal that an event has happened, this method takes an argument which
// is the name of the event
emitter.emit('messagelogged');


// logger.log("Hello");

