console.log('hello world');
/*
var http = require('http');
var server = http.createServer(function (req, res) {
    res.end('hello world');

});
server.listen(3000, function () {
    console.log("When this callback is invoked our server is listening on port: " + 3000);

});
*/

var stockRepository = require('./stockRepository');
var app = require('./app.js')(stockRepository);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

