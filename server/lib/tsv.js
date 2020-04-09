var fs = require('fs');

function tsvJSON(tsv) {
  const lines = tsv.split('\n');
  const headers = lines.slice(0, 1)[0].split('\t');
  return lines.slice(1, lines.length).map(line => {
    const data = line.split('\t');
    return headers.reduce((obj, nextKey, index) => {
      obj[nextKey] = data[index];
      return obj;
    }, {});
  });
}

var imdb = fs.readFileSync("../files/eps.tsv", "utf8")
var ratings = tsvJSON(imdb)
fs.writeFile('../files/episodes.json', JSON.stringify(ratings), (err) => {
  if (err) throw err;
  console.log('done')
});
