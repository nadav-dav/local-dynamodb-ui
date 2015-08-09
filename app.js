var express = require('express');
var ejs = require('ejs');
var db = require('./db');
var app = express();

var template = ejs.compile('<% include view.html %>', {cache: false, filename: __filename});

app.use(express.static('statics'));

app.get('/', function (req, res) {
  db.getData()
    .then(function (data){
      res.send(template({data: data}));
    })
    .catch(function (err){
      res.status(500).send(err.stack || err);
    });
});

app.listen(33331);
