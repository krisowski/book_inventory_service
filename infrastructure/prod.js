var base = require('./base');
var _ = require('lodash');

var prod = {
    name: 'book-inventory-kris'
};

base.configurator(_.merge({}, base.config, prod));
