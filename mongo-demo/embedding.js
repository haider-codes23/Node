const mongoose = require('mongoose');
const { findById } = require('../vidly/models/customerModel');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = "Mosh Hamadani";
  course.save();
}
// updateAuthor("66a8ef875e1cc45b8eb130e4");
// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: "John"})
// ]);


async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
//addAuthor("66a8fe8e968b43113745a4e4", new Author({name: "Musa"}));

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.deleteOne({_id: authorId});
  course.save(); 
}
removeAuthor("66a8fe8e968b43113745a4e4","66a8fe8e968b43113745a4e3" )

