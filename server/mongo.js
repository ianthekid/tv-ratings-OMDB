var MongoClient = require('mongodb').MongoClient;
var config = require('./config.json');

module.exports = function(callback) {
  var url = `mongodb://${config.mongo.user}:${config.mongo.pass}@${config.mongo.url}`;
  MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    if(err) return reject(err);
    //console.log("Connected to MongoDB");
    return callback(client);
  });
};