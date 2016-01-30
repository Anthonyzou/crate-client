
# API

# crate-client

```javascript
var crateClient = require('crate-client', options)
var client = new crateClient('localhost:4200')
client = new crateClient(['localhost:4200', 'localhost:4400'])

client.query('select * from users where ? = id', [42], callback)
```

### Options for http endpoints - checkout poolee

```javascript
{
  maxPending: 1000,       // maximum number of outstanding request to allow
  maxSockets: 20,         // max sockets per endpoint Agent
  timeout: 60000,         // request timeout in ms
  resolution: 1000,       // timeout check interval (see below)
  keepAlive: false,       // use an alternate Agent that does http keep-alive properly
  ping: undefined,        // health check url
  pingTimeout: 2000,      // ping timeout in ms
  retryFilter: undefined, // see below
  retryDelay: 20,         // see below
  maxRetries: 5,          // see below
  name: undefined,        // optional string
  agentOptions: undefined// an object for passing options directly to the Http Agent
}
```

### Usage

**removeConditionals**

Remove checks for the callback being a function. And maybe other conditionals in the future.

**client.exec**

Send a query that does not include arguments

`client.query('select * from users where 42 = id', callback)`

**client.query**

Send a query that does have arguments, in the form of an array

`client.query('select * from users where ? = id', [42], callback)`


### Testing

- Start up crate with `docker-compose up`
- Install mocha `npm -g i mocha`
- run testing with `npm test`
