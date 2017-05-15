// bmc: Homework by Bon Crowder
// bmc: see https://github.com/mathfour/liri-node-app for code details

// bmc: I'm still unclear on this "use strict" thing
'use strict';

// bmc: requirements
var Twitter = require('twitter');
var SpotifyWebApi = require('spotify-web-api-node');
var request = require("request");
var inquirer = require('inquirer');
var twitterKeyFile = require("./keys.js");
var spotifyApi = new SpotifyWebApi();
var fs = require("fs");

// bmc: Twitter Keys
var client = new Twitter({
    consumer_key: twitterKeyFile.twitterKeys.consumer_key,
    consumer_secret: twitterKeyFile.twitterKeys.consumer_secret,
    access_token_key: twitterKeyFile.twitterKeys.access_token_key,
    access_token_secret: twitterKeyFile.twitterKeys.access_token_secret
});

// bmc: array with the inquiry choices
var whatToDo = [
{
    type: "list",
    message: "pick one",
    name: "thisIsWhatToDo",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}];

// bmc: inquiring of the user what they want to do
inquirer.prompt(whatToDo).then(function(whatTheyWannaDo) {
    switchAction(whatTheyWannaDo.thisIsWhatToDo)
});

function switchAction(decision) {
    var title = "";
    if (decision === "do-what-it-says") {
        recordIt("doing what it says");
        fs.readFile("random.txt", "utf8", function (error, data) {
            var dataArr = data.split(",");
            decision = dataArr[0];
            title = dataArr[1];

            callbackGuts(title);
        });
    }
    else {
        title = getTitle(callbackGuts);
    }
    function callbackGuts(input){
        if (typeof input === "string"){
            title = input;
        }
        else {
            title = input.title001;
        }
        switch (decision) {
            case "my-tweets" :
                if (title === ""){
                    title = "MathFour";
                }
                getTheTweets(title);
            break;

            case "spotify-this-song" :
                if (title === ""){
                    title = "the sign ace of base";
                }
                getTheSongInfo(title);
            break;

            case "movie-this" :
                if (title === ""){
                    title = "mr nobody";
                }
                getTheMovieInfo(title);
            break;
        }
    }

}
// bmc: variable with the inquiry bits for song/movie title
var getTheTitle = [
    {
		type: "input",
		message: "For what account/song/movie?",
		name: "title001"
    }];

function getTitle(callbackGuts) {
    inquirer.prompt(getTheTitle).then(callbackGuts)
}

function getTheTweets(account) {
    var params = {screen_name: account};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        var i=0;
        if (!error) {
            recordIt("\n----------------------------");
            recordIt("\nThe last 20 tweets for @" + account + " are: \n");
            do{
                recordIt(i+1 + ". " + tweets[i].text);
                recordIt("\ntweeted on " + tweets[i].created_at);
                i++;

                recordIt("\n");
            } while (i<20);
        }
    });
}

// bmc: function to get the information for a song
function getTheSongInfo(song) {
    spotifyApi.searchTracks(song).then(function (data) {
        var checking = data.body.tracks.items[0].album.artists[0].name;
            recordIt("\n----------------------------");
            recordIt("\nThis is the artist: ");
            recordIt(data.body.tracks.items[0].album.artists[0].name);
            recordIt("\nThis is the song's name: ");
            recordIt(data.body.tracks.items[0].name);
            recordIt("\nThis is preview link of the song from Spotify: ");
            recordIt(data.body.tracks.items[0].preview_url);
            recordIt("\nThis is album that the song is from: ");
            recordIt(data.body.tracks.items[0].album.name);
        }).catch(function(err) {
        recordIt('\nUnfortunately, something has gone wrong.', err.message);
    });
}

// bmc: function to get the information for a movie
function getTheMovieInfo(movie) {

    var url = "http://www.omdbapi.com/?t=" + movie;
    request(url, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        recordIt("\n----------------------------");
        recordIt("\nThe movie's title is " + JSON.parse(body).Title);
        recordIt("\nThe movie came out in " + JSON.parse(body).Year);
        recordIt("\nThe movie's IMDB rating is " + JSON.parse(body).imdbRating);
        recordIt("\nThe movie's was made in " + JSON.parse(body).Country);
        recordIt("\nThe movie was filmed in " + JSON.parse(body).Language);
        recordIt("\nThe plot is: " + JSON.parse(body).Plot);
        recordIt("\nThe stars of the movie are " + JSON.parse(body).Actors);
        recordIt("\nFind out more on the website: " + JSON.parse(body).Website);
  }
});
}

function recordIt(stuffToWrite) {
    console.log(stuffToWrite);
    fs.appendFile("log.txt", stuffToWrite, function (err) {
        if (err) {
            return console.log("Something went wrong writing to log.txt: " + err);
        }
    });
}
