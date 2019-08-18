data = [
    {
      name: 'Butters',
      age: 3,
      type: 'dog'
    },
    {
      name: 'Lizzy',
      age: 6,
      type: 'dog'
    },
    {
      name: 'Red',
      age: 1,
      type: 'cat'
    },
    {
      name: 'Joey',
      age: 3,
      type: 'dog'
    },
];

// Goal of Code: Sum all of the dog ages in dog years

// Strategy 1: Use a for loop

// function getAges(data) {
//     let sum = 0;

//     for(i = 0; i < data.length; i++) {
//         if (data[i].type === 'dog') {
//             let tempAge = data[i].age;
//             sum += (tempAge * 7);
//         }
//     }
//     return sum;
// }

// console.log(getAges(data));

// Objection: This code is hard to read because it completes all 3 of our challenges in a single function

// Strategy 2: Filter, Map, Reduce

// //Create an array called "ages"
// let ages = data
// // returns ages as an array of objects that are only "dog"s
//   .filter((animal) => {
//     return animal.type === 'dog';
// // returns ages as an array of dog ages
// }).map((animal) => {
//     return animal.age * 7
// // sums all of the values in "ages"
// }).reduce((sum, animal) => {
//     return sum + animal;
// });

// console.log(ages);

// Objection: This code is still too convoluted (I guess?)!

// Strategy 3: Create 3 pure functions and chain them
//  note: pure functions only depend on their input arguments

let isDog = (animal) => {
    return animal.type === 'dog';
}

let dogYears = (animal) => {
    return animal.age * 7;
}

let sum = (sum, animal) => {
    return sum + animal;
}

let ages = data
    .filter(isDog)
    .map(dogYears)
    .reduce(sum);

console.log(ages);