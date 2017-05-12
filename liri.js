// bmc: todo Grab the data from keys.js
// bmc: todo Store keys in variables
// bmc: todo Write function for spotify
// bmc: todo Write function for movie
// bmc: todo Write function for do it
// bmc: todo Figure out how to get more info from some of the inputs

'use strict';

var Twitter = require('twitter');
// var spotify = require("spotify");
var request = require("request");
var inquirer = require('inquirer');

var twitterKeyFile = require("./keys.js");

var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();

var client = new Twitter({
    consumer_key: twitterKeyFile.twitterKeys.consumer_key,
    consumer_secret: twitterKeyFile.twitterKeys.consumer_secret,
    access_token_key: twitterKeyFile.twitterKeys.access_token_key,
    access_token_secret: twitterKeyFile.twitterKeys.access_token_secret
});
var params = {screen_name: 'mathfour'};

var whatToDo = [
{
    type: "list",
    message: "pick one",
    name: "thisIsWhatToDo",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}
];

inquirer.prompt(whatToDo).then (function(whatTheyWannaDo) {
    console.log(whatTheyWannaDo);
    var decision = whatTheyWannaDo.thisIsWhatToDo;

    switch (decision) {
        case "my-tweets" :
            tweetIt();
            // console.log("tweet it");
            break;
        case "spotify-this-song" :
            singIt();
            // console.log("sing it yo");
            break;
        case "movie-this" :
            watchIt();
            console.log("watch it yo");
            break;
        case "do-what-it-says":
            doIt();
            console.log("do it yo");
            break;
    }
});

function tweetIt() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        var i=0;
        if (!error) {
            console.log("The last 20 tweets for @MathFour are: ");
            do{
                console.log(i+1 + ". " + tweets[i].text);
                i++;
            } while (i<20);
        }
    });
}
	var getTheTitle = [	
		{
		type: "input",
		message: "which title do you want?",
		name: "title001"
		}];

function singIt() {
    	// console.log("launch singIt function");
	    inquirer.prompt(getTheTitle).then (function (titleGuts) {
            getTheSongInfo(titleGuts.title001);
            });
        };

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

function getTheMovieInfo(movie) {

}

function watchIt() {
    console.log("launch watchIt function");
    inquirer.prompt(getTheTitle).then (function (titleGuts) {
            getTheMovieInfo(titleGuts.title001);
    });
    }

function doIt() {
    console.log("launch doIt function");
}

function WhatTitle(theTitleName) {
    this.type = "input";
    this.message = "what" + theTitleName + "?";
    this.name = theTitleName;
}

