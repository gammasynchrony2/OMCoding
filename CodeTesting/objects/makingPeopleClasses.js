// Creating people and heroes using classical inheritance in JS
// Strongly opposed by instructors because it relies heavily on immutable hierarchies

class Person {
    constructor(name, job) {
        this.name = name;
        this.job = job;
    }
    getName() {
        return this.name;
    }
    getJob() {
        return this.job;
    }
}

class SuperHero extends Person {
    constructor(name, heroName, superPower) {
        super(name);
        this.heroName = heroName;
        this.superPower = superPower;
    }

    secretIdentity() {
        return `${this.heroName} is ${this.name}!!!`;
    }
}

let batman = new SuperHero("Bruce Wayne", "Batman");

console.log(batman.secretIdentity());