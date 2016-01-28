
## A simple crate client with pooled http fallbacks based on the poolee library.


### To run

```javascript
var crateClient = require('crate-client')
var client = new crateClient('localhost:4200')
client = new crateClient(['localhost:4200', 'localhost:4400'])

client.exec('select * from users where ? = id', [42])
```
