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

    // instead of using pipe, call request and give it a callback containing err, res, and body

    request(url, function(err, res, body) {
        // parse the JSON that came back in the response body
        //      set it equal to tweets
        var tweets = JSON.parse(body);
        // define what data is going into the template so we can render the tweets
        //      done by setting the locals property on our express response
        //      pass in the array of tweets and the username
        response.locals = {tweets: tweets, name: username};
        // tell the response which template to render out
        //      using tweets embedded javascript
        response.render('tweets.ejs');
    });
});

// Note: code is out of date because Twitter now requires user authentication

// curl command: [curl -s http://localhost:8080/tweets/eallam | prettyjson]

// cleaning up returned json: npm install prettyjson -g (global install)

// taking what we want out of the json return and putting it into a web browser:
//  install templating library: npm install --save ejs
//      will look for templates under the views directory
