var express = require("express");
var cors = require('cors');
var fs = require('fs');
var config = require('./config.json');
const query = require('./lib/query');
const api = `${config.endpoint}?apikey=${config.api}`;
const ratings = JSON.parse(fs.readFileSync("./files/ratings.json"));

/*
 * Start Server
 */
var app = express();
app.use(express.json());
app.use(cors());
app.listen(3001, () => {
 console.log("Server running on port 3001");
});

app.get('/s/:search', function(req, res){
  var url = `${api}&type=series&t=${req.params.search}`;
  query(url, function(r){
    res.send(r);
  })
})

app.get('/id/:id', function(req, res){
  var url = `${api}&i=${req.params.id}`;
  var data = []

  query(url, function(show){
    for(var i=1; i<=show.totalSeasons; i++) {
      var season = `${url}&Season=${i}`;
      query(season, function(s){
        var episodes = [];
        s.Episodes.map((e) => {
          var episode = e;
          if(e.imdbRating === "N/A") {
            var ep = ratings.find(x => x.tconst === e.imdbID)
            if(ep) episode['imdbRating'] = ep.averageRating
          }
          episodes.push(episode)
        })
        data.push({ 
          season: parseInt(s.Season, 10),
          episodes: episodes
        });
        if(data.length == show.totalSeasons)
          res.send(data)
      })
    }
  })
})

app.get('/ratings', function(req,res){

  var ep = imdb.find(x => x.tconst === "tt6362512")
  res.send(ep)

})
