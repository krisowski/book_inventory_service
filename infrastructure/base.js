
var heroin = require('heroin-js');
 
var configurator = heroin(process.env.HEROKU_API_TOKEN);

var base = {
  name: 'book-inventory-kris',
  organization: undefined,
  region: 'eu',
  maintenance: false,
  stack: 'cedar-14',
  config_vars: { MONGODB_URI: process.env.MONGODB_URI, NODE_ENV: 'base' },
  addons: {},
  collaborators: 
  [ 'rafal.bodek@gmail.com',
    'krzysztof.sniezynski@motorolasolutions.com' ],
  features: {
    'runtime-dyno-metadata': { enabled: false },
    'log-runtime-metrics': { enabled: false },
    'http-session-affinity': { enabled: false },
    preboot: { enabled: false },
    'http-shard-header': { enabled: false },
    'http-end-to-end-continue': { enabled: false },
    'http-sni': { enabled: false }
  },
  formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
  log_drains: [],
  domains: []
}

configurator(base);

module.exports = {
  configurator: configurator,
  config: base
}

