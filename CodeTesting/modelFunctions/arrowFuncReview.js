function newMulti(factor) {
    return function(x) {
        return x * factor;
    }
}

// Create a function that multiplies by 2
let doubler = newMulti(2);

// Call the doubler with an input argument of 2
console.log(doubler(2));

// Equivalent functions

/*
function(x) {return x * factor}; // If there's only one line of code, you don't need te curly brackets

(x) => return x * factor;

x => return x * factor; // Don't need parentheses if function is passed a single argument

x => x * factor // Return is assumed
*/

// newMulti() could be written as
function newMulti(factor) {
    return x => x * factor;
}