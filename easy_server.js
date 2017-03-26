var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

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

app.post('/', function (req, res) {
	var jsonObject = JSON.stringify(req.body);

  fs.writeFile(__dirname + "/static/post.json", jsonObject, function(err) {
    if(err) {
       return console.log(err);
    }

    res.send('The file was saved successfully!');
  });
});

app.listen(8888, function () {
  console.log('Example app listening on port 8888!');
});


//docker run -d -p 27017:27017 --name my-mongo mongo
//var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/test");
