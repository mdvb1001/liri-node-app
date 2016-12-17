// Load the NPM Package inquirer
var inquirer = require('inquirer');
var spotify = require('spotify');
// Include the request npm package(Don 't forget to run "npm install request" in this folder first!)
var request = require('request');
var fs = require('fs');

// Create a "Prompt" with a series of questions.
inquirer.prompt([
    // Here we create a basic text prompt.
    {
        type: "list",
        message: "Tweets, Songs, Movies or Something?",
        choices: ["tweets", "songs", "movies", "something"],
        name: "searchType"
    },
    // Here we create a basic password-protected text prompt.
    {
        type: "confirm",
        message: "my-tweets",
        name: "tweets",
        when: function(answers) {
            return answers.searchType === "tweets";
        }
    }, {
        type: "input",
        message: "spotify-this-song",
        name: "songs",
        when: function(answers) {
            return answers.searchType === "songs";
        }
    }, {
        type: "input",
        message: "movie-this",
        name: "movies",
        when: function(answers) {
            return answers.searchType === "movies";
        }
    }, {
        type: "confirm",
        message: "do-what-it-say",
        name: "something",
        when: function(answers) {
            return answers.searchType === "something";
        }
    }
    // Once we are done with all the questions... "then" we do stuff with the answers
    // In this case, we store all of the answers into a "user" object that inquirer makes for us. 
]).then(function logic(search) {
    // If we log that search as a JSON, we can see how it looks.
    // console.log(JSON.stringify(search, null, 2));
    if (search.searchType === "tweets") {
        // TWITTER
        console.log('this is loaded');
        keys = require('./keys.js');
        var Twitter = require('twitter');
        var client = new Twitter({
            consumer_key: keys.twitterKeys.consumer_key,
            consumer_secret: keys.twitterKeys.consumer_secret,
            access_token_key: keys.twitterKeys.access_token_key,
            access_token_secret: keys.twitterKeys.access_token_secret
        });
        var params = {
            screen_name: 'maxvanbel',
            count: 20
        };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log("\nTweet #" + (i+1) + ": " + tweets[i].text);
                }
            }
        });
    } else if (search.searchType === "songs") {
        // SPOTIFY 
        // var type = process.argv[3];
        // var response = process.argv[2];
        var response = search.songs;
        if (response.length === 0) {
        	response = "the sign ace of base";
        }
        spotify.search({
            type: 'track',
            query: response
        }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;   
            } else {
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Preview: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
            }
            // console.log(data.tracks);
        });
    } else if (search.searchType === "movies") {
        // OMBD 
        // Create an empty variable for holding the movie name
        var movieName = search.movies;
        // Then run a request to the OMDB API with the movie specified 
        var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';
        // This line is just to help us debug against the actual URL.  
        if (movieName.length === 0) {
            movieName = "Mr. Nobody"; // this doesn't actually do anything...
            queryUrl = 'http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&tomatoes=true&r=json';
        }
        console.log(queryUrl);
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country produced: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + "\n" + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
            }
        });
    } else if (search.searchType === "something") {
    	fs.readFile("random.txt", "utf8", function(error, data){

    		data = data.split(',');

      	console.log(data);
      	console.log("First element: " + data[0]);
      	console.log("Second element: " + data[1]);
        search.searchType = data[0];
        	if (search.searchType === "songs") {
        		response = data[1];
        		logic("songs");
        	} else if (search.searchType === "movies") {
        		movieName = data[1];
        		logic("movies");
        	} else if (search.searchtype === "tweets") {
        		logic("twitter");
        	}
      });
    }
});



