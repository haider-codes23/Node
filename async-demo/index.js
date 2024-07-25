// //Synchronous code
// console.log('Before');
// console.log('After');

//Asynchronous Code
console.log('Before');
// getUser(1, function (user) {
//   console.log('USER:', user);
//   getRepositories(user.gitHubUserName, (arrOfRepos) => {
//     console.log(arrOfRepos);
//     getCommits(arrOfRepos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });
// Promise Based Approach
// getUser(1)
//   .then(user => getRepositories(user.gitHubUserName))
//   .then(repoArr => getCommits(repoArr[0]))
//   .then(commits => console.log(commits))
//   .catch(err => console.log(error.message));


// Async Await approach 
async function displayCommmits() {
  try {
    const user = await getUser(1);
    const arrOfRepos = await getRepositories(user.gitHubUserName);
    const commits = await getCommits(arrOfRepos[0]);
    console.log(commits);

  } catch (err) {
    console.log(err);
  }

}

displayCommmits()


console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from the database");
      // resolve({id: id, gitHubUserName: "Musa"}); 
      reject(new Error("User doesn't exist"));
    }, 2000);
  });
};


function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`User: ${username} has these repos`);
      resolve(['repo1', 'repo2', 'repo3']);
    });
  });
};

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`This user has these commits`);
      resolve(['commit1', 'commit2']);
    });
  });
};