var request = require('request');

module.exports = function (url, callback) {
  var options = {
    url: url,
    headers: {'Content-Type': 'application/json'}
  };
  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      result = JSON.parse(body);
      return callback(result, false);
    } else {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      return callback(response.statusCode);
    }
  });
}
