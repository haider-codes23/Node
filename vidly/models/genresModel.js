const mongoose = require("mongoose");
// define a schema for genre 
const genreSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }

});

// create a model for this genres
const Genre = mongoose.model('genre', genreSchema);

module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;