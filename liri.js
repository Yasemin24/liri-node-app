require("dotenv").config();
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
//add prompt!!!

var inputString = process.argv;
var choice = ["bands","spoity","movies"];



//BandsinTown
axios.get("https://rest.bandsintown.com/artists/Maroon5/events?app_id=trilogy")
  .then(function (response) {
    console.log(response.data);

    response.data.forEach(function(band){
        console.log(band.venue.name);
        console.log(band.venue.city);
        //console.log(band.datetime);
        var date = moment(band.datetime);
        console.log(date.format("MM-DD-YYYY"));
        var time =moment(band.datetime);
        console.log(time.format("hh : mm a"));
        //console.log(song);
    //song.venue.forEach(function(venue){
        //console.log(venue);
    //})
        
    })
 })
  .catch(function (error) {
    console.log(error);
  });


  
  var liriArg = process.argv[2];

if (liriArg === "band") {
    band();
} else if (liriArg === "spotify-this-song") {
    song();
} else if (liriArg === "movie-this") {
    movie();
} else if (liriArg === "do-what-it-says") {
    doSome();
} else {
    console.log("Please enter one of the following commands: band, spotify-this-song, movie-this, do-what-it-says.");
}

function movie() {

  var args = process.argv;
  var movieName = "";

  for (i = 3; i < args.length; i++) {
      if (i > 3 && i < args.length) {
          movieName = movieName + "+" + args[i];
      } else {
          movieName = args[i];
      }
  };

  if (movieName === "") {
      movieName = "Mr." + "+" + "Nobody"
  };

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          console.log("-------------------------------------------------------------------------------------------");
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("IMDB rating: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country: " + JSON.parse(body).Country);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Plot: " + JSON.parse(body).Plot);
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log("-------------------------------------------------------------------------------------------");
      } else {
          console.log("Try again.");
      }
  });
};
  
  





