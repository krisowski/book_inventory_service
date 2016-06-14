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
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var repository = require('./repository.js');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log('New request at ' + new Date());
  next();
});

app.use(function(req, res, next) {
  console.log('Authorization');
  next();
});

/*
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected succesfully to server");

  db.close();
});
*/

var logIncoming = function(req, res, next) {
  console.log('Local middleware');
  next();
};

/*
app.get('/', function(req, res, next) {
  console.log('Local middleware');
  },
  function (req, res) {
  console.log('New request...');
  res.send('Hello World Express!');

});
*/

app.get('/', logIncoming,  function (req, res) {
  console.log('New GET request...');
  //throw new Error('ERROR');
  res.send('Hello World Express!');
});

app.get('/stock', logIncoming,  function (req, res, next) {
  console.log('STOCK...');
  repository.
    findAll().
    then(function(results) {
    res.json(results);
  }).catch(next);

  /*
    collection.find({}).toArray(function (err, results) {
      res.json(results);
    })
   */
/*
  MongoClient.connect(url, function(err, db) {
    db.collection('books').find({}).toArray(function (err, results) {
      res.json(results);
    })
    //db.close();
  })
   */
});

app.get('/stock/:isbn', logIncoming,  function (req, res, next) {
  console.log('STOCK by ISBN...');
  repository.
    getCount(req.params.isbn).
    then(function (result) {
        if (result) {
            res.json({count: result});
        } else {
            next();
        }
    }).
    catch(next);
});

app.post('/', logIncoming,  function (req, res, next) {
  console.log('New POST request...');
  console.log('DB update...');

  repository.
    stockUp(req.body.isbn, req.body.count).
    then(function() {
      res.json({isbn: req.body.isbn, count: req.body.count});
    }).catch(next);

});

app.use(function(req, res, next) {
  console.error("CLIENT ERROR HANDLER");
  res.status(400).send("Link doesn't exist");
});

app.use(function(err, req, res, next) {
  console.error("SERVER ERROR HANDLER");
  console.error(err.stack);
  res.status(500).send('Something broke');
});

module.exports = app;
