// QUIT VIDEO AT 44:00

var express = require('express');

// Declare a variable called app and give it all the attributes and methods od express
var app = express();

app.set('view engine', 'ejs');

// tell index.js to access the routes files
var routes = require('./routes');

// include the directory of our static assets

var path = require('path');
// tell express that the static assets are in the directory "public"
app.use(express.static(path.join(__dirname, 'public')));

// Specify Routes
// a route can be thought of as binding some functionality when a user requests a certain address in an application

// home route
//      get corresponds to a reqeust for a route
//          first parameter '/' is the url we are visiting
//          second parameter is a callback

// this functionality gets executed when a user request the home page
app.get('/', routes.home);

// movie single
// /:episode_number? can be accessed off the request object's "param" variable
app.get('/star_wars_episode/:episode_number?', routes.movie_single);

// handle an error if someone requests an episode that doesn't exist
// this function is placed at the end so it takes the lowest precedence (e.g., if nothing else has been executed yet)
app.get('*', routes.notFound);

// Have the app listen for a reqeust
//      first parameter is the port we're going to listen on (usually 3000)
//      second parameter is a function that's going to run while we're listening
//          in this case, console.log
app.listen(3000, function() {
    console.log("The application is running on localhost:3000");
})