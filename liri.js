// bmc: todo Grab the data from keys.js
// bmc: todo Store keys in variables
// bmc: todo Write function for do it

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
inquirer.prompt(whatToDo).then (function(whatTheyWannaDo) {
    switchAction(whatTheyWannaDo.thisIsWhatToDo)
});

function switchAction(decision) {
    var title = "";
    if (decision === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (error, data) {
            var dataArr = data.split(",");
            decision = dataArr[0];
            title = dataArr[1];
        });
    }
    else {
        title = getTitle();
    }
    switch (decision) {
        case "my-tweets" :
            getTheTweets(title);
            break;
        case "spotify-this-song" :
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
// bmc: variable with the inquiry bits for song/movie title
var getTheTitle = [
    {
		type: "input",
		message: "For what account/song/movie?",
		name: "title001"
    }];

function getTitle() {
    inquirer.prompt(getTheTitle).then (function (titleGuts) {
            return titleGuts.title001;
            // getTheSongInfo(titleGuts.title001);
        });
}

function getTheTweets(account) {
    var params = {screen_name: account};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        var i=0;
        if (!error) {
            console.log("The last 20 tweets for @" + account + " are: ");
            do{
                console.log(i+1 + ". " + tweets[i].text);
                i++;
            } while (i<20);
        }
    });
}

// bmc: function to get the information for a song
function getTheSongInfo(song) {
    spotifyApi.searchTracks(song).then(function (data) {
        var checking = data.body.tracks.items[0].album.artists[0].name;
            console.log("----------------------------");
            console.log("This is the artist: ");
            console.log(data.body.tracks.items[0].album.artists[0].name);
            console.log("----------------------------");
            console.log("This is the song's name: ");
            console.log(data.body.tracks.items[0].name);
            console.log("----------------------------");
            console.log("This is preview link of the song from Spotify: ");
            console.log(data.body.tracks.items[0].preview_url);
            console.log("----------------------------");
            console.log("This is album that the song is from: ");
            console.log(data.body.tracks.items[0].album.name);
            console.log("----------------------------");
        }).catch(function(err) {
        console.log('Unfortunately, something has gone wrong.', err.message);
    });
}

// bmc: function to get the information for a movie
function getTheMovieInfo(movie) {

    var url = "http://www.omdbapi.com/?t=" + movie;
    request(url, function(error, response, body) {

    if (!error && response.statusCode === 200) {

        console.log("The movie's title is " + JSON.parse(body).Title);
        console.log("The movie came out in " + JSON.parse(body).Year);
        console.log("The movie's IMDB rating is " + JSON.parse(body).imdbRating);
        console.log("The movie's was made in " + JSON.parse(body).Country);
        console.log("The movie was filmed in " + JSON.parse(body).Language);
        console.log("The plot is: " + JSON.parse(body).Plot);
        console.log("The stars of the movie are " + JSON.parse(body).Actors);
        console.log("Find out more on the website: " + JSON.parse(body).Website);
  }
});
}
