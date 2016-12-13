// TWITTER
console.log('this is loaded');
// var obj = require('./keys.js');
// console.log(obj);
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'nCvOJwqmZxMDLxqAVB7lac23Y',
    consumer_secret: 'RKKiDtJwaL4rsh6JNqC4g7v6l2UCfIeLUKyL2yeF3f8EGlNQ7Q',
    access_token_key: '16493862-jZMrn4voLPuA3e4o3pZ1eNka4glXlZU8i1aTXJciU',
    access_token_secret: 'JXmQ0GNEyLytLcLQdKFspAxp7uDxvFfwLSYjlZWjGDjj3'
});
var params = {
    screen_name: 'maxvanbel',
    count: 5
};
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log("\nTweets#" + i + ": " + tweets[i].text);
        }
    }
});
// --------------------------------------->
// SPOTIFY 

// var type = process.argv[2];
			// var response = process.argv[2];

			// var spotify = require('spotify');
			 
			// spotify.search({ type: 'track', query: response, limit: 1}, function(err, data) {
			//     if ( err ) {
			//         console.log('Error occurred: ' + err);
			//         return;
			//     }
			// 	console.log(JSON.stringify(data, null, 2));
 
    // Do something with 'data' 

// Client ID
// 21eb58e4e4b44a92a536ae5c9da24551
// Client Secret
// 70afd877aa2c40c9834a3a3ef4fb9914
			// });


//----------------------------------------->
// OMBD 
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// var request = require('request');

// // Store all of the arguments in an array 
// var nodeArgs = process.argv;

// // Create an empty variable for holding the movie name
// var movieName = "";

// // Loop through all the words in the node argument
// // And do a little for-loop magic to handle the inclusion of "+"s
// for (var i=2; i<nodeArgs.length; i++){

// 	if (i>2 && i< nodeArgs.length){

// 		movieName = movieName + "+" + nodeArgs[i];

// 	}

// 	else {

// 		movieName = movieName + nodeArgs[i];
// 	}
// }

// // Then run a request to the OMDB API with the movie specified 
// var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json';

// // This line is just to help us debug against the actual URL.  
// console.log(queryUrl);

// request(queryUrl, function (error, response, body) {

// 	// If the request is successful (i.e. if the response status code is 200)
// 	if (!error && response.statusCode == 200) {

// 		// Parse the body of the site and recover just the imdbRating
// 		// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
// 		console.log("Release Year: " + JSON.parse(body)["Year"])
// 	}
// });
