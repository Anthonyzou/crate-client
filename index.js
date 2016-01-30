var Pool,
  crateClient,
  http,
  util;

http = require("http");
Pool = require("poolee");
util = require('util');


crateClient = function crateClient(endpoints, options, clientOptions) {
  if (options == null) {
    options = {};
  }
  if (clientOptions == null) {
    clientOptions = {};
  }
  if (util.isString(endpoints)) {
    this.pool = new Pool(http, [endpoints], options);
  } else if (util.isArray(endpoints)) {
    this.pool = new Pool(http, endpoints, options);
  }

  if(clientOptions.noChecks){
    this.handle = function(cb, err, response, body) {
      cb(err, response.statusCode, JSON.parse(body));
    }
  }
  else {
    this.handle = function(cb, err, response, body) {
      if (util.isFunction(cb)) {
        return cb(err, response.statusCode, JSON.parse(body));
      }
    }
  }
}

crateClient.prototype.exec = function(statment, cb) {
  this.pool.request({
    method: 'POST',
    path: '/_sql',
  },
  JSON.stringify({"stmt": statment }),
  this.handle.bind(null, cb));
  return this;
};

crateClient.prototype.query = function(statment, args, cb) {
  this.pool.request({
    method: 'POST',
    path: '/_sql',
  },
  JSON.stringify({
    "stmt": statment,
    "args": args,
  }),
  this.handle.bind(null, cb));
  return this;
};

module.exports = crateClient;
