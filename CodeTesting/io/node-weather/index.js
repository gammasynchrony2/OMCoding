const request = require('request');
let apiKey = '4afcdf7f677a8a91c92db178774b848c';
// create a 'city' and assigned it a string value of a location we'd like to test with
const argv = require('yargs').argv;
let city = argv.c || 'Austin'
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`




// Passes in a URL
// request returns a callback function with err, response, and body arguments
// Checks for an error in our request
//      in the event of an error, the error is logged and the program closes
//      i there is no error, we log the entire contents of the response body
request(url, function (err, response, body) {
    if(err) {
        console.log('error:', error)
    } else {
        let weather = JSON.parse(body);
        let message = `It's ${weather.main.temp} degrees in ${weather.name}`;
        console.log(message);
    }
})



