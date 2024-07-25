// const resolvedPromise = Promise.resolve({id: 1, name:"Musa"});
// resolvedPromise.then(user => console.log(user));

// const rejectedPromise = Promise.reject(new Error("This is because it is rejected"));
// rejectedPromise.catch(error => console.log(error));
// console.log("**********")


const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Async operation 1....');
    reject(new Error("becasue something failed"));
  }, 2000);
});



const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation 2....');
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2]).then(result => console.log(result)).catch(err => console.log(err));