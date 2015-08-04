var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('../public/client'));

app.post('/api', function (req, res) {
  req.on('data', function (data) {
    var query = JSON.parse(data);
    var access = 'https://api.instagram.com/v1/tags/' + query.data + '/media/recent?access_token=26237012.24a20a9.5a528843d38c4aaa99d434aa35af8356';
    request(access, function (error, response, body) {
      res.send(body)
    });
  });
});

app.listen(8080);