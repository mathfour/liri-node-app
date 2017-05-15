# NodeJS Application 
LIRI Node Application - Homework 8

Submitted by Bon Crowder

### How to run the application: 

Type `node liri.js` and press enter. You will be prompted to choose one of four options.

#### If you choose `my-tweets`
  1. You'll be prompted with `For what account/song/movie?`. 
  2. Enter a twitter account for which you want the last 20 tweets. Do not use the `@` or the full url. Only use the actual account name. For example, for my twitter feed, you would enter `MathFour`. 
  3. Press enter.
  4. This will show the last 20 tweets from that account and when they were created at in your terminal/bash window. It will also log these in the `log.txt` file.
  5. If no twitter handle is provided, the program will default to "MathFour". 

####  If you choose `spotify-this-song`
  1. You'll be prompted with `For what account/song/movie?`. 
  2. Enter a song name and press enter.
  3. This will show the following information about the song in your terminal/bash window. It will also log these in the `log.txt` file.

      * Artist
      * The song's name
      * A preview link of the song from Spotify
      * The album that the song is from
  4. If no song is provided then the program will default to "The Sign" by Ace of Base

####  If you choose `movie-this`

  1. You'll be prompted with `For what account/song/movie?`. 
  2. Enter a movie name and press enter.
  3. This will show the following information about the movie in your terminal/bash window. It will also log these in the `log.txt` file.

      * Title of the movie
      * Year the movie came out
      * IMDB Rating of the movie
      * Country where the movie was produced
      * Language of the movie
      * Plot of the movie
      * Actors in the movie
      * The URL to get more information about the movie

  * If no movie is provided, the program will output data for the movie 'Mr. Nobody.'

#### If you choose `do-what-it-says`
  * Based on the information in the file `random.txt`, one of the three commands will be run. You do not need to input anything further. 
  * If you want to enter something different in the text file, use the format:

    **\<command>, "<account/song/movie>"**

    where *\<command>* is one of these: 
    * `my-tweets`
    * `spotify-this-song`
    * `movie-this`

    and *<account/song/movie>* is the name of the account for tweets, song for Spotify or movie for OMDB information
