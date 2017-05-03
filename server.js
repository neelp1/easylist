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

app.post('/api/names', function(req, res) {
  var jsonObject = req.body
  // console.log(jsonObject['name']);
  MongoClient.connect(url, function(err, db){
    db.collection('test').insertOne(jsonObject,
      function(err, result){
        console.log("Inserted a document");
        // callback();
      });
    db.close();
  });
  res.end();
});

app.get('/api/names', function(req, res){
  MongoClient.connect(url, function(err, db){
    var cursor = db.collection('test').find();
    var docs = []
    cursor.each(function(err, doc){
      if(doc != null){
        docs.push(doc);
      }else{
        res.send(docs);
      };
    });
  });
  // req.end();
});

app.put('/api/names/:old-:new', function(req, res){
  console.log(req.params);
  // console.log(req.params['new']);
  MongoClient.connect(url, function(err, db){
    db.collection('test').updateOne(
      {"name": req.params['old']},
      {$set: {"name": req.params['new']}}
    );
    res.send('put complete');
  });
});

app.delete('/api/names/:name', function(req, res){
  MongoClient.connect(url, function(err, db){
    db.collection('test').deleteOne(req.params);
    res.send(req.params['name'] + ' deleted');
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
