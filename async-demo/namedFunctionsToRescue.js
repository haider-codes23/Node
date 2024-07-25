// //Synchronous code
// console.log('Before');
// console.log('After');

//Asynchronous Code
console.log('Before');
getUser(1, handleUser);

console.log('After');

function handleUser(user) {
  getRepositories(user.gitHubUserName, handleRepositories);
}

function handleRepositories(arrOfRepos){
  console.log(arrOfRepos);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from the database");
    callback({id: id, gitHubUserName: "Musa"});
  }, 2000);
};


function getRepositories(username, callback) {
  setTimeout(() => {
    console.log(`User: ${username} has these repos`);
    callback(['repo1', 'repo2', 'repo3']);
  });
};