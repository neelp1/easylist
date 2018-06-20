var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");//object modeling

//mongoose to connect to db and for get/post calls
mongoose.connect("mongodb://localhost:27017/test");

mongoose.connection.on("open", function(){
  console.log("mongodb is connected...");
});

var testDoc = mongoose.model('testdoc', {
  name: String
});

app.get('/test', function(req, res){
  testDoc.find(function(err, test){
      if(err)
        res.send(err)

      res.json(test);
  });
});

app.post('/test', function(req, res) {
  // create a doc, information comes from AJAX request from Angular
  // console.log(req.headers);
  console.log(res);

  testDoc.create({
    name: req.body.text
  },
  function(err, test) {
    if (err)
      res.send(err);

    testDoc.find(function(err, doc){
      if (err)
        res.send(err)

      res.json(doc);
    });
  });
});

// delete a todo
app.delete('/test/:item_id', function(req, res) {
  testDoc.remove({
    _id : req.params.item_id
  }, function(err, doc) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    testDoc.find(function(err, doc) {
      if (err)
        res.send(err)
      res.json(doc);
    });
  });
});

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

// app.post('/', function (req, res) {
// 	var jsonObject = JSON.stringify(req.body);
//
//   fs.writeFile(__dirname + "/static/post.json", jsonObject, function(err) {
//     if(err) {
//        return console.log(err);
//     }
//
//     res.send('The file was saved successfully!');
//   });
// });

app.listen(8089, function () {
  console.log('Example app listening on port 8089!');
});
