// bmc: todo Grab the data from keys.js
// bmc: todo Store keys in variables
// bmc: todo Write function for spotify
// bmc: todo Write function for movie
// bmc: todo Write function for do it
// bmc: todo Figure out how to get more info from some of the inputs

'use strict';

var Twitter = require('twitter');
var spotify = require("spotify");
var request = require("request");
var inquirer = require('inquirer');

var twitterKeyFile = require("./keys.js");

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
    name: "whatToDo",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
}
];

inquirer.prompt(whatToDo).then (function(whatTheyWannaDo) {
    console.log(whatTheyWannaDo);
    var decision = whatTheyWannaDo.whatToDo;

    switch (decision) {
        case "my-tweets" :
            tweetIt();
            console.log("tweet it");
            break;
        case "spotify-this-song" :
            singIt();
            console.log("sing it");
            break;
        case "movie-this" :
            watchIt();
            console.log("watch it");
            break;
        case "do-what-it-says":
            doIt();
            console.log("do it");
            break;
    }
});

function tweetIt() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        var i=0;
        if (!error) {
            console.log("The last 10 tweets for @MathFour are: ");
            do{
                console.log(i+1 + ". " + tweets[i].text);
                i++;
            } while (i<10);
        }
    });
}

function singIt() {
    console.log("launch singIt function");
    var whatSong = new WhatTitle(song);
}

function watchIt() {
    console.log("launch watchIt function");
    var whatMovie = new WhatTitle(movie);
    inquirer.prompt(whatMovie).then (function(nameOfMovie) {
        var movieToLookUp = nameOfMovie.whatMovie;

    })
}

function doIt() {
    console.log("launch doIt function");
}

function WhatTitle(theTitleName) {
    this.type = "input";
    this.message = "what" + theTitleName + "?";
    this.name = theTitleName;
}

