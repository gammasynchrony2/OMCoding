// *** Named function with two parameters ***
function sum(a, b) {
    return a + b;
}

// remove funciton keyword (assumed)
// assign function to a variable (standard functions do this automatically)
// add arrow
//      parentheses on the left contain parameters
//      braces on the right contain function syntax 
// since syntax only contains one line of code, 'return' is assumed
// braces can also be removed
//      everything to the right of the arrow is assumed to be a return statement
let sum = (a, b) => a + b;

// *** Named function with one parameter ***
function isPositive(number) {
    return number >= 0
}

// same as above, except parentheses around parameters an also be removed because there is only 1 parameter
let isPositive = number => number >= 0


// *** Named function with no parameters ***
function randomNumber() {
    return Math.random;
}

let randomNumber = () => Math.random;

// *** Anonymous function with no parameters ***
document.addEventListener('click', function()  {
    console.log('click')
})

// significant benefits of arrow functions lie in syntax used for anonymous functions
// remove 'function' keyword
// doesn't need to be assigned to a variable

document.addEventListener('click', () => console.log('click'))

// main benefit of arrow functions is that they recase the use of 'this' inside them
