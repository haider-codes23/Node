const mongoose = require('mongoose');

// Connecting To MongoDB in our machine 
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log("connected to MongoDB..."))
  .catch(err => console.error('Could not connect to MongoDB'));

  // Creating a Schema
const courseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(value) {
        return value && value.length > 0;
      },
      message: "A course should have atleast one tag"
    }
  },
  date: {type: Date, default: Date.now},
  isPusblished: Boolean,
  price: {type: Number, required: function() {
    return this.isPusblished;
  }}
});
// Creating a Model
const Course = mongoose.model('Course', courseSchema);
 
// Creating a course document using Course Model
async function createCourse() {
  const course = new Course({
    name: 'React Course',
    author: 'Mosh',
    tags: null,
    isPusblished: true,
    price: 15
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err){
    console.log(err.message);
  }

};

createCourse();

//Getting all the courses from the Course collection 
async function getcourse() {
  const result = await Course.countDocuments();
  // .find({author: "Mosh"})
  // .or([{name: "Mosh"}, {isPusblished: true}])
  // .limit(2)
  // .sort({name: -1})
  // .select({name: 1});
  console.log(result);
};

async function updateCourse1(id) {
  const course = await Course.findById(id).catch(err => console.log(err));
  if (!course) return null;
  course.isPublished = false;
  course.author = "Haider";
  const result = await course.save();
  console.log(result);
}

//updateCourse("66a4a875fe23aeb5e237a318");

async function updateCourse2(id) {
  // here we are passing a query object object to update method and telling it that we
  // want to update the _id property and set to the id argument.
  // As a second Arg we pass the update object, here we need to use one or more
  // mongoDB update operators e.g. $set and then we use colon and an object, inside 
  // we set all the properties we want to update
  const course = await Course.updateOne({_id: id}, {
    $set: {
      author: "Mosh",
      isPublished: true
    }
   });
};

//updateCourse2("66a4a875fe23aeb5e237a318");

async function deleteDocument(id) {
  const result = await Course.deleteOne({_id: id});
  console.log(result);
}

//deleteDocument("66a4a875fe23aeb5e237a318");




//getcourse();
//createCourse();
