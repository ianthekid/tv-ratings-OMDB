const query = require('./query');

module.exports = function(url, total, seasons) {
  return new Promise(function(resolve) {
    //Keep count as some shows are missing season data in OMDB API
    var cnt=total;
    for(var i=2; i<=total; i++) {
      //OMDB api query for season
      query(`${url}&Season=${i}`, function(s) {
        //OMDB API response code. If OMDB is missing data, reduce total count to finish loop
        if(s.Response == "True") {
          seasons.push({ 
            season: parseInt(s.Season, 10),
            episodes: s.Episodes
          })
          //Run seasons query async. Wait for arr to match totalSeasons
          if(seasons.length == cnt)
            return resolve(seasons);
        } else {
          cnt--;
        }
      })
    }
  })
}
