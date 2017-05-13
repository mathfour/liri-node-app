var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();
var titleGuts = "i would die 4 u";

spotifyApi.searchTracks(titleGuts).then(function (data) {
    var mainTrackIndex = -1;

    for (var i = 0, len = data.body.tracks.items.length; i < len; i++) {
        if (data.body.tracks.items[i].name = titleGuts){
            mainTrackIndex = i;
        }
    }

    console.log("this is the artist: ");
    console.log(data.body.tracks.items[0].album.artists[0].name);

    console.log("this is the song's name: ");
    console.log(data.body.tracks.items[0].name);

    console.log("this is preview link of the song from Spotify: ");
    console.log(data.body.tracks.items[0].preview_url);

    console.log("this is album that the song is from: ");
    console.log(data.body.tracks.items[0].album.name);
});

// bmc: if data.body.tracks.items[i].name = titleGuts, then use that i as the index for the track we need




{"Title":"Back to the Future","Year":"1985","Rated":"PG","Released":"03 Jul 1985","Runtime":"116 min","Genre":"Adventure, Comedy, Sci-Fi","Director":"Robert Zemeckis","Writer":"Robert Zemeckis, Bob Gale","Actors":"Michael J. Fox, Christopher Lloyd, Lea Thompson, Crispin Glover","Plot":"Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.","Language":"English","Country":"USA","Awards":"Won 1 Oscar. Another 18 wins & 26 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"},{"Source":"Rotten Tomatoes","Value":"96%"},{"Source":"Metacritic","Value":"86/100"}],"Metascore":"86","imdbRating":"8.5","imdbVotes":"787,027","imdbID":"tt0088763","Type":"movie","DVD":"17 Dec 2002","BoxOffice":"$2,925,880.00","Production":"Universal Pictures","Website":"http://www.bttfmovie.com/","Response":"True"}






