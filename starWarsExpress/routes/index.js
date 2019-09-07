// Specify Routes
// a route can be thought of as binding some functionality when a user requests a certain address in an application

// Give these routes access to the information in movies.json

var moviesJSON = require('../movies.json');

// home route
//      get corresponds to a reqeust for a route
//          first parameter '/' is the url we are visiting
//          second parameter is a callback

// this functionality gets executed when a user request the home page
exports.home = function(req, res) {
    // have the server send something back to the webpage
    // by default, Express will look in the Views directory for the template
    //      Don't even have to specify .ejs extension

    // store the array of information in the movies.json folder

    var movies = moviesJSON.movies;

    // Express is good at letting you pass information to a template
    //      can pass an object literal {} that includes a list of key-value pairs that we can access in the ejs template
    res.render('home', {
        title : "Star Wars Movies",
        movies : movies
    });
}

// movie single
// /:episode_number? can be accessed off the request object's "param" variable
exports.movie_single = function(req, res) {
    // we're going to store the "param" variable in a new variable
    var episode_number = req.params.episode_number;
    res.send("This is the page for episode " + episode_number);

}

// handle an error if someone requests an episode that doesn't exist
// this function is placed at the end so it takes the lowest precedence (e.g., if nothing else has been executed yet)
exports.notFound = function(req, res) {
    res.send("This is not the page that you are looking for");
}