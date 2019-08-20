// Constructor function for a Person object with properties name and job
function Person(name, job) {
    this.name = name;
    this.job = job;
}

// Adds function getName() to Person.prototype
// returns the person's name
Person.prototype.getName = function getName() {
    return this.name;
}

// Adds function getJob() to Person.prototype
// returns the person's job
Person.prototype.getJob = function getJob() {
    return this.job;
}

// Constructor function for a SuperHero
// The call() method calls a function with a given THIS value and arguments provided individually
// call() in this case allows SuperHero() to appropriate the call() function from person, taking "name" and "heroName" as arguments;
function SuperHero(name, heroName) {
    Person.call(this, name, heroName);
}

// Because Superhero() is using Person.call, heroName is actually setting the value for "job"

// The Object.create() method creates a new object using an existing object as the prototype of the newly created object
// This line creates a prototype for SuperHero and sets it equal to a Person object that is created in the same line 
SuperHero.prototype = Object.create(Person);

// This line gives the superhero prototype a constructor function
SuperHero.prototype.constructor = SuperHero;

// I have no idea what this line does. Commenting it out doesn't make any difference. It's bad sorcery. 
SuperHero.parent = Person.prototype;

// This line gives the superhero prototype a function called getJob() that returns a string with the SuperHero's Super Hero name
SuperHero.prototype.getJob = function() {
    return `I am ${this.job}!`;
};

// Creates a new SuperHero named Bruce Wayne with job Batman
// Uses the constructor function for Person
var batman = new SuperHero("Bruce Wayne", "Batman");

// I wrote this line to see the properties of the Batman object to see if "Batman" was assigned to job
console.log(batman);

console.log(batman.getJob());