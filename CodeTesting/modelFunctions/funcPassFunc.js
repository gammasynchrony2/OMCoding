// Create a function that multiplies two numbers together

function multiplier(x, factor) {
    return x * factor;
}

console.log(multiplier(5,2));

// Create a function that creates functions that multiply by different factors

function newMulti(factor) {
    return function(x) {
        return x * factor;
    }
}

// Create a function that multiplies by 2
let doubler = newMulti(2);

// Call the doubler with an input argument of 2
console.log(doubler(2));

// Can use newMulti() to create infinitely many multiplication functions
let tripler = newMulti(3);

console.log(tripler(7));
