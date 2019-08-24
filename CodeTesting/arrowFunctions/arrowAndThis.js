// Person constructor
//      takes in a name and assigns it to this.name

class Person {
    constructor(name) {
        this.name = name
    }

// In both of the following functions, setTimeout() is simply used to change the scope in which this.name is called

    // uses an arrow function inside of a Timeout function to print this.name
    printNameArrow() {
        setTimeout(() => {
            console.log('Arrow: ' + this.name)
        }, 100)
    }

    // uses a stanard function inside of a Timeout function to TRY and print this.name
    // in this case, 'this' is defined based on where the function is called
    printNameFunction() {
        setTimeout(function() {
            console.log('Function: ' + this.name)
        }, 100)
    }
}

let person = new Person('Bob');

// with arrow function, 'this' is defined from where the function is called
// in this case, this.name is in the global scope
person.printNameArrow();

// calling this function here has the same effect as calling console.log(this.name)
//      this.name is out of scope
//          i.e., 'this' is not defined in the global scope
person.printNameFunction();