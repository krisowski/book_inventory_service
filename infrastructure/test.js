var base = require('./base');
var _ = require('lodash');

var test = {
    name: 'book-inventory-kris-test',
    config_vars: { MONGODB_URI: process.env.MONGODB_URI, NODE_ENV: 'test' }
};

base.configurator(_.merge({}, base.config, test));
