// let thisGuy = require("./sampleJSON");

// Reading in a JSON file using fs

var fs = require('fs');

let thisGuy = fs.readFileSync('sampleJSON.json')

let forManipulation = JSON.parse(thisGuy);

forManipulation.name = "Jiminy Jillickers";

// Writing to a JSON file

let returnJSON = JSON.stringify(forManipulation, null, 2);

fs.writeFileSync('sampleJSON.json', returnJSON, finished);
function finished(err) {
    console.log('all set');
}

console.log(returnJSON);