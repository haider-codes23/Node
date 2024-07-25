const p = new Promise((resolve, reject) => {
  // Kick off some Async Operation e.g. access a DB, call a web server
  // ....
  setTimeout(() => {
    // resolve(1);
    reject(new Error("message"));
  }, 2000)
  //reject(new Error('message'));
});

// consuming the promise 
p.then(result => console.log(result)).catch(error => console.log(error.message));
