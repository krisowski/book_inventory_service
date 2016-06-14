var base = require('./base');
var _ = require('lodash');

var prod = {
    name: 'book-inventory-kris',
    config_vars: { MONGODB_URI: process.env.MONGODB_URI, NODE_ENV: 'production' },
};

base.configurator(_.merge({}, base.config, prod));
