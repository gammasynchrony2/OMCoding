// long form

// let promise = fetch(wordnikAPI);
// promise.then(gotData);
// promise.catch(gotErr)

// function gotData(data) {
//     console.log(data);
// }

// function gotErr(err) {
//     console.log(err);
// }

// shorter form

// fetch(wordnikAPI)
//   .then(function(data){
//     console.log(data);
// }).catch(function(err) {
//     console.log(err);
// })

// shortest form

// fetch(wordnikAPI)
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

function setup() {
      delay(1000)
 //   delay('blah blah') // to produce error
        .then(() => console.log('hello'))
        .catch((err) => console.error(err));
}

function delay(time) {
    return new Promise((resolve, reject) => {
        if (isNaN(time)) {
            reject(new Error('delay requires a valid number'))
        }
        setTimeout(resolve, time);
    });
    // setTimeout(sayHello, time);
}

setup();
// function sayHello() {
//     createP('hello');
// }