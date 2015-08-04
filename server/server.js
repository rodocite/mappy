var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');

app.use(express.static('../public'));
app.post('/', function (req, res) {
  req.on('data', function(data) {
    var query = data.toString().slice(6);
    var access = 'https://api.instagram.com/v1/tags/' + query + '/media/recent?access_token=26237012.24a20a9.5a528843d38c4aaa99d434aa35af8356';

    request(access, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
      }
    });
  });

  res.redirect('/');
});
// request(access).pipe(fs.createWriteStream('../public/data'));


app.listen(8080);