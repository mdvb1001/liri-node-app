// Load the NPM Package inquirer
var inquirer = require('inquirer');
// Load the NPM Package spotify
var spotify = require('spotify');
// Load the NPM Package twitter
var Twitter = require('twitter');
// Load the NPM Package request for OMDB
var request = require('request');
// Load the fs Package for the 'do-what-I-say' command and random.txt
var fs = require('fs');
// Create a "Prompt" with a series of commands
inquirer.prompt([
	// List of commands to choose from, then respective commands with 'when' key.
    {
        type: "list",
        message: "Tweets, Songs, Movies or Something?",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "searchType"
    }, {
        type: "confirm",
        message: "my-tweets",
        name: "my-tweets",
        when: function(answers) {
            return answers.searchType === "my-tweets";
        }
    }, {
        type: "input",
        message: "spotify-this-song",
        name: "spotify-this-song",
        when: function(answers) {
            return answers.searchType === "spotify-this-song";
        }
    }, {
        type: "input",
        message: "movie-this",
        name: "movie-this",
        when: function(answers) {
            return answers.searchType === "movie-this";
        }
    }, {
        type: "confirm",
        message: "do-what-it-says",
        name: "do-what-it-says",
        when: function(answers) {
            return answers.searchType === "do-what-it-says";
        }
    }
    // Once we are done with all choosing a command and making a search... we "then" we do stuff with the 'searches'
    // In this case, we store all of the 'searches' into a 'search' object that inquirer makes for us. 
]).then(function logic(search) {
    // If user selects the my-tweet command, then user tweets are displayed
    if (search.searchType === "my-tweets") {
        // TWITTER
        console.log('this is loaded');
        // keys are protected in keys.js file 
        keys = require('./keys.js');
        // retrieve keys from keys.js file
        var client = new Twitter({
            consumer_key: keys.twitterKeys.consumer_key,
            consumer_secret: keys.twitterKeys.consumer_secret,
            access_token_key: keys.twitterKeys.access_token_key,
            access_token_secret: keys.twitterKeys.access_token_secret
        });
        // basic parameters: username and limit of 20 latest tweets
        var params = {
            screen_name: 'maxvanbel',
            count: 20
        };
        // fetch tweets 
        client.get('statuses/user_timeline', params, function(error, tweets, songName) {
        	// if no error then run through all tweets 
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log("\nTweet #" + (i + 1) + ": " + tweets[i].text);
                }
            }
        });
    // If user select the spotify-this-song command... 
    } else if (search.searchType === "spotify-this-song") {
        // the song name is the song inputed 
        var songName = search["spotify-this-song"];
        // if nothing is inputed then get 'the sign' by 'ace of base'
        if (songName.length === 0) {
            songName = "the sign ace of base";
        }
        // fetch song data (type is track)
        spotify.search({
            type: 'track',
            query: songName
        }, function(err, data) {
        	// if error occurs, then display error... 
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            // otherwise, display info on the track
            } else {
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Preview: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
            }
        });
     // If user selects movie-this as a command...
    } else if (search.searchType === "movie-this") {
        // create a variable for movie inputed by user
        var movieName = search['movie-this'];
        // Then run a request to the OMDB API with the movie specified 
        var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&tomatoes=true&r=json';
        // If nothing is inputed by the user, return "Mr. Nobody" as default   
        if (movieName.length === 0) {
            queryUrl = 'http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&tomatoes=true&r=json';
        }
        console.log(queryUrl);
        // otherwise... fetch info on movie inputed by user 
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
      			// Parse the JSON string se we get an object 
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
     // If user selects the do-what-it-says command... 
    } else if (search.searchType === "do-what-it-says") {
    	// read the data from the random.txt via the fs package 
        fs.readFile("random.txt", "utf8", function(error, data) {
        	// Split the data where the ',' is so we get an array
            data = data.split(',');
            // The first element of the array is stored as the command
            search.searchType = data[0];
            // The second element of the array is stored as the input... either as a song or a movie
            search["spotify-this-song"] = data[1];
            search["movie-this"] = data[1];
            // recursive function... to run the whole thing again
            logic(search);

        });
    }
});
