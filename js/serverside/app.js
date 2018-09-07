/**
* @Author: John Isaacs <john>
* @Date:   15-Apr-172017
* @Filename: app.js
* @Last modified by:   john
* @Last modified time: 16-Apr-172017
*/
var jsonfile = require('jsonfile')

var file = 'boris.json'


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/tweets';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
    findDocuments(db, function(docs) {
      db.close();

    });

});

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('euref');
  // Find some documents
  collection.find({"user.screen_name" : 'BorisJohnson'}).limit(2).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);


    jsonfile.writeFileSync(file, docs)
    callback(docs);
  });
}
