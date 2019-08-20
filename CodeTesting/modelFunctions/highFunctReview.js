function sing(callback) {
    console.log(" la la la");

    // only executes callback() if a function has been passed
    // allows sing to execute with no arguments passed
    if(callback instanceof Function) {
        callback();
    }
}

function meow() {
    console.log("meow meow");
}

sing();
sing(meow);

// calling sing() with meow() as an anonymous function
sing(function() {console.log('meee ooow')})