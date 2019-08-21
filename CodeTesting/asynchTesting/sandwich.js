// This code uses async to simulate the ordering and preparing of sandwiches

// orderSandwich takes 4 arguments
// 'duration' is the amount of time in seconds it takes to prepare the order
//      or in this case, how long before the callback function is executed
// 'callback' is a function that takes 2 arguments: customer and sandwich
//      it's function is currently unknown because the function needs to be passed in as an argument
//      in this case, enjoySandwich() will be passed as a callback function
// In this example, the callback function will not be invoked until the setTimeout() function completes
//      however, other orders will be taken in the mean time
function orderSandwich(customer, description, duration, callback) {
    console.log('< ' + customer + ' ordered a ' + description);
    setTimeout(function() {
        console.log('- ' + customer + ', you\'re order is ready!');
        var sandwich = 'a delicious ' + description;
        callback(customer, sandwich);
    }, duration * 1000)
}

// Documentation for setTimeout()
//      calls a function or evaluates an expression after a specified number of milliseconds
//      two different syntaxes:
//          function myFunction() {myVar = setTimeOut(alertFunc, 3000)}
//          setTimeout(function() {x.value = '2 Seconds' }, 2000);

function enjoySandwich(customer, sandwich) {
    console.log('< ' + customer + ' is enjoying ' + sandwich);
}

orderSandwich('Susan', 'Roast Pork and Pickled Cucumber Sandwich', 4, enjoySandwich);
orderSandwich('Mike', 'Reuben on Rye', 2, enjoySandwich);
orderSandwich('Shane', "Smoked Salmon Salad Sandwich", 6, enjoySandwich);
orderSandwich('Brandon', 'Apple Peanut Butter Sandwich', 1, enjoySandwich);

console.log('No More Customers.');