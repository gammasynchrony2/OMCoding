const instructor = {
    fullName: "Homer D. Poe",
    favoriteFoods: ['Pizza', "Pad Thai", "Steak"],
    displayFoods: function() {
        console.log('Favorite foods for', this.fullName);
        this.favoriteFoods.forEach(function(food) {
            console.log(this.fullName + ' likes ' + food);
        });
    }
};

instructor.displayFoods();

// In this case, "this" is inside an anonymous function, so its context is the global object
// To use this, we would need to pass it into the anonymous function.

// Strategy 1: Set "that" or "self" equal to "this" in the outer function
// This is known as the "Closure Hack" because it causes the anonymous function to "close over" "this"
// This process envelopes "this" in the scope of the anonymous function

const instructorTwo = {
    fullName: "Homer D. Poe",
    favoriteFoods: ['Pizza', "Pad Thai", "Steak"],
    displayFoods: function() {
        that = this;
        console.log('Favorite foods for', that.fullName);
        that.favoriteFoods.forEach(function(food) {
            console.log(that.fullName + ' likes ' + food);
        });
    }
};

instructorTwo.displayFoods();

// Strategy 2: Binding
// Using the "bind" method on the function will force the function to always use the specified value as its context

// Procedure: tack the .bind() function onto the anonymous function
const instructorThree= {
    fullName: "Homer D. Poe",
    favoriteFoods: ['Pizza', "Pad Thai", "Steak"],
    displayFoods: function() {
        console.log('Favorite foods for', this.fullName);
        this.favoriteFoods.forEach(function(food) {
            console.log(this.fullName + ' likes ' + food);
            }.bind(this)
        );
    }
};

instructorThree.displayFoods();

// Strategy 3: Call
// Works because the object prototype has a "call" method
// The call() method calls a function with a given "this" value and arguments provided individually
// The call() allows for a function/method belonging to one object to be assigned and called for a different object
// 
// call() provides a new value of "this" to the function/method
// Note: call() also lets you pass arguments into the calling function
function sayHello() {
    console.log("Hi! My name is " + this.name);
}

const person = { name: "Manatee the Railyard Toreador" };
const cat = { name: "Hobbles McGillicudy" };
sayHello.call(person);
sayHello.call(cat);

// Strategy 4: Apply
// Works because the object prototype has an "apply" method
// Works almost exactly like "call", only you pass in an array of arguments instead of a comma-separated list

// Strategy 5: Arrow functions
// Arrow functions get around the "this" gotcha because they use "lexical binding"
//  lexical binding -> interpret "this" at the time of delaration
// Traditional functions use "dynamic scope" and interpret "this" at runtime (whenever they are called/invoked)

const teacher = {
    name: 'Shane',
    speak: function() {
        let boundFunction = () => {
            console.log('later my name is ' + this.name);
        };

        setTimeout(boundFunction, 1000);
    }
};

teacher.speak();