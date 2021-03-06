var express = require("express");
var cors = require('cors');
var fs = require('fs');
var config = require('./config.json');
const query = require('./lib/query');
const getSeasons = require('./lib/getSeasons');
const api = `${config.endpoint}?apikey=${config.api}`;
const ratings = JSON.parse(fs.readFileSync("./files/ratings.json"));
var mongo = require('./mongo.js');

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
  var url = `${api}&type=series&s=${req.params.search}`;
  query(url, function(r){
    res.send(r);
  })
})

app.get('/id/:id', function(req, res){
  var url = `${api}&i=${req.params.id}`;

  query(url, function(show) {
    //Show overview info (Title, Poster, meta info)
    var details = show;
    details['data'] = [];

    //Loop through each Season and add as arr of Objs
    for(var i=1; i<=show.totalSeasons; i++) {
      var season = `${url}&Season=${i}`;
      query(season, function(s){
        var episodes = [];
        s.Episodes.map((e) => {
          var episode = e;
          //OMDB API has outdated ratings. Check updated JSON file from IMDB tsv data
          if(e.imdbRating === "N/A") {
            var ep = ratings.find(x => x.tconst === e.imdbID)
            if(ep) episode['imdbRating'] = ep.averageRating
          }
          episodes.push(episode)
        })
        details['data'].push({ 
          season: parseInt(s.Season, 10),
          episodes: episodes
        });
        if(details['data'].length == show.totalSeasons)
          res.send(details)
      })
    }
  })
})


app.get('/mongo/show/:tconst', function(req, res){
  mongo(client => {
    const db = client.db('tvratings');
    const collection = db.collection('episodes');
    const ratings = db.collection('ratings');

    (async () => {
      let results = await collection.find({'parentTconst': req.params.tconst}).toArray();
      let episodes = [];
      let cnt=0;

      results.map((item) => {
        (async () => {
          let ep = await ratings.findOne({'tconst': item.tconst});
          if(!ep) {
            console.log(item.tconst)
          } else {
            episodes.push({
              ...item,
              averageRating: ep.averageRating,
              numVotes: ep.numVotes
            })  
          }
          cnt++;
          if(cnt == results.length) {
            res.send(episodes)  
            console.log(episodes.length)
            console.log(results.length)
          }
          })()
      })
    })()


  });

})


app.get('/mongo/ratings/:tconst', function(req, res){

  mongo(client => {
    const db = client.db('tvratings');
    const collection = db.collection('ratings');

    (async () => {
      let item = await collection.findOne({'tconst': req.params.tconst});
      res.send(item)  
    })()

  });
})


app.get('/show/:tconst/seasons', function(req, res){
  //OMDB api query for seasons by series tconst and Season #
  var url = `${api}&i=${req.params.tconst}`;
  query(`${url}&Season=1`, function(show) {
    //${show} returns obj with (show/series Title, totalSeasons, and Season1 Episodes)
    var seasons = [{
      season: 1, 
      episodes: show.Episodes 
    }];
    if(show.totalSeasons > 1) {
      //Loop through all seasons and output as array of objs sorted by Season #
      getSeasons(url, show.totalSeasons, seasons)
      .then((arr) => {
          //sort by season
          arr.sort((a,b) => (a.season > b.season) ? 1 : ((b.season > a.season) ? -1 : 0));
          res.send(arr);
      })
    } else {
      //If only 1 Season exists
      res.send(seasons);
    }
  });
})

app.get('/collection', function(req, res){
  mongo(client => {
    const db = client.db('tvratings');
    const collection = db.collection('test');

    collection.countDocuments()
    .then(records => res.send(`${records} records`));
  })  
})



app.get('/ratings/:tconst', function(req,res){
  mongo(client => {
    const db = client.db('tvratings');
    const collection = db.collection('test');

    collection.findOne({'tconst': req.params.tconst})
    .then(function(doc) {
      var result = (!doc) ? 'No record found.' : doc;
      client.close();
      res.send(result)
    });
  })  
 // var ep = imdb.find(x => x.tconst === "tt6362512")
})
