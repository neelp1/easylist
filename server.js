var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');//object modeling
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//connect to db and for get/post calls
var url = 'mongodb://localhost:27017/test';
mongoose.connect("mongodb://localhost:27017/test");
var testDoc = mongoose.model('testdoc', {
  name: String
});

var insertDoc = function(data){
  console.log(data);
  MongoClient.connect(url, function(err, db){
    db.collection('test').insertOne(data,
      function(err, result){
        assert.equal(err, null);
        console.log("Inserted a document");
        callback();
      });
  })
};

// app.post('/test', function (req, res) {
// 	var jsonObject = JSON.stringify(req.body);
//
//   console.log(jsonObject);
// });

app.post('/test', function(req, res) {
  var jsonObject = req.body
  // console.log(jsonObject['name']);
  MongoClient.connect(url, function(err, db){
    db.collection('test').insertOne(jsonObject,
      function(err, result){
        console.log("Inserted a document");
        // callback();
    });
  });
  res.end();
});
// var insertDocument = function(db, callback){
//   db.collection('names').insertOne({
//     "name": "batman"
//   },
//   function(err, result){
//     assert.equal(err, null);
//     console.log("Inserted a document");
//     callback();
//   });
// };

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   insertDocument(db, function(){
//     db.close();
//   });
// });

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server.");
//   db.close();
// });
app.get('/test', function(req, res){
  testDoc.find(function(err, test){
      if(err)
        res.send(err)

      res.json(test);
  });
});

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(8888, function () {
  console.log('Example app listening on port 8888!');
});
