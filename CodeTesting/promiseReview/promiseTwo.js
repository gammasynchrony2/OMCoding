let p = new Promise((resolve, reject) => {
    let a = 1 + 1;
    if (a == 2) {
        resolve('success');
    } else {
        reject("failed");
    }
})

// .then will execute i the resolve condition
// the argument passed to resolve will be passed as an argument to .then
p.then((message) => {
    console.log('This is in the then ' + message);
}).catch((message) => {
    console.log('This is in the catch ' + message)
})