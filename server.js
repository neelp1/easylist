var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');//object modeling
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

//connect to db and for get/post calls
var url = 'mongodb://localhost:27017/test';

//TODO:send data into db from angular
// var insertDocument = function(data){
//   console.log(data);
// };
var insertDocument = function(db, callback){
  db.collection('names').insertOne({
    "name": "batman"
  },
  function(err, result){
    assert.equal(err, null);
    console.log("Inserted a document");
    callback();
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function(){
    db.close();
  });
});
// var value = function()
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.");
//   db.close();
// });

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(8888, function () {
  console.log('Example app listening on port 8888!');
});
