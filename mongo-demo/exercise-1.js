const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log("connected to MongoDB"))
. catch (err => console.log(err));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
})
const Course = mongoose.model('Course', courseSchema);

async function findCourse() {
  const result = await Course
  .find({isPublished: true})
  .or([{tags: 'frontend'}, {tags: 'backend'}])
  .sort({price: -1})
  .select({name: 1, author: 1, isPublished: 1, tags: 1, price: 1})
  console.log(result);
}

async function findAllCourse() {
  const result = await Course
  .find({isPublished: true})
  .or([{ price: {$gte: 15}}, {name : /.*by.*/}]);
  console.log(result);
};

// findCourse();
//findAllCourse();

async function updateCourse(id) {
  const course = await Course.findById(id).catch(err => console.log(err));
  if (!course) return null;
  course.isPublished = false;
  course.author = "Haider";
  const result = await course.save();
  console.log(result);
}

updateCourse("5a68fdd7bee8ea64649c2777");