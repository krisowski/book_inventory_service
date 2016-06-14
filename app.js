var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./middleware');
var app = express();
//var stockRepository = require('./stockRepository.js')

module.exports = function(stockRepository) {

  var routes = require('./routes')(stockRepository);

  app.use(bodyParser.json());
  app.use(middleware.logger);

  app.get('/', routes.hello);
  app.get('/stock', routes.findAll);
  app.get('/stock/:isbn', routes.getCount);
  app.post('/', routes.stockUp);

  app.use(middleware.clientErrorHandler);
  app.use(middleware.serverErrorHandler);

  return app;
};
