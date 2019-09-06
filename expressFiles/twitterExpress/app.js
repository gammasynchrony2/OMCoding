// Create an endpoint where the user can send in a twitter name and print out the latest 10 tweets

var request = require('request');
var url = require('url');

//note: colon indicates a dynamic username
app.get('/tweets/:username', function(req, response) {

    //grab the username out of the request parameters
    var username = req.params.username;

    options = {
        protocol: 'http:',
        host: 'api.twitter.com',
        pathname: '/1/statuses/user_timeline.json',
        query: { screen_name: username, count: 10}
    }

    // store the response in variable called twitterUrl
    var twitterUrl = url.format(options);
    // pipe the request to response that goes back to the user's browser
    request(twitterUrl).pipe(response);
});

// Note: code is out of date because Twitter now requires user authentication

// curl command: [curl -s http://localhost:8080/tweets/eallam | prettyjson]

// cleaning up returned json: npm install prettyjson -g (global install)

// taking what we want out of the json return and putting it into a web browser:
//  install templating library: npm install --save ejs
//      will look for templates under the views directory
