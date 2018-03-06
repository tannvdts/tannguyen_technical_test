var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);

console.log('Viewing at http://localhost:8080');