// import method
var express = require('express');

// create an instance of express
var app = express();

// define endpoints
app.get('/', function(request, response) {
    response.sendFile(__dirname + "/index.html");
});

// tells express to listen on port 8080
app.listen(8080);