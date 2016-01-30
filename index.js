var Pool,
    crateClient,
    http,
    util;

http = require("http");
Pool = require("poolee");
util = require('util');

crateClient = function crateClient(endpoints, options) {
  if (options == null) {
    options = {};
  }
  if (util.isString(endpoints)) {
    this.pool = new Pool(http, [endpoints], options);
  } else if (util.isArray(endpoints)) {
    this.pool = new Pool(http, endpoints, options);
  }
}

crateClient.prototype.exec = function(statment, cb) {
  console.log({
    stmt: statment,
  })
  this.pool.request({
    method: 'POST',
    path: '/_sql',
    headers : {
      'Content-Type':'application/json'
    }
  }, JSON.stringify({
    stmt: statment,
  }), function(err, response, body) {
    console.log(err, response.statusCode, body)
    if (util.isFunction(cb)) {
      return cb(err, response,  body);;
    }
  });
  return this;
};

module.exports = crateClient;
