
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// aysnc await approach 
async function displayTopMoviesOfCustomer() {
  const customer = await getCustomer(1);
  console.log('Customer: ', customer);
  if (customer.isGold){
    const listOfMovie = await getTopMovies(customer);
    console.log('Top movies: ', listOfMovie);
    const emailverification = await sendEmail(customer.email)
    console.log(emailverification);
  
  }

}

displayTopMoviesOfCustomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  

  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);

  });
};

function sendEmail(email, movies, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Email send");
    }, 4000);

  });
};

