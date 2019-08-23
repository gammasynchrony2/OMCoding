const recordVideoOne = new Promise((resolve, reject) => {
    resolve('Video 1 Recorded')
})

const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded')
})

// Will execute all three promises simultaneously
// Will the call the .then or .catch methods depending on whereht they resolved
Promise.all([
// Promise.race() will output as soon as one of the promises returns a rsolve or reject
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((messages) => {
    // Prints out an array of messages
    // Will only be a single message if Promise.race() is used
    console.log(messages)
})