var base = require('./base');
var _ = require('lodash');

var test = {
//    name: 'book-inventory-kris-test'
    name: 'book-inventory-kris'
};

base.configurator(_.merge({}, base.config, test));
