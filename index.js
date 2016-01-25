var Pool, crateClient, http, util;

http = require("http");

Pool = require("poolee");

util = require('util');

crateClient = (function() {
  function crateClient(endpoints, options) {
    if (options == null) {
      options = {};
    }
    if (util.isString(endpoints)) {
      this.pool = new Pool(http, [endpoints], options);
    } else if (util.isArray(endpoints)) {
      this.pool = new Pool(http, [endpoints], options);
    }
  }

  crateClient.prototype.exec = function(statment, args, cb) {
    return this.pool.request({
      method: 'POST',
      path: '/_sql'
    }, {
      stmt: statment,
      args: args
    }, function(err, response, body) {
      if (!util.isfunction(cb)) {
        return;
      }
      if (err || response !== 200) {
        return cb(err, response, body);
      }
      return cb(null, body);
    });
  };

  return crateClient;

})();

module.exports = crateClient;
