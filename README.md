# Rimiter

``` js
// get package
const Rimiter = require('rimiter')

// create a new rate limiter
const rimiter = new Rimiter()

// when an item is rate limited, ban them for 60 seconds
rimiter.on('limited', rimiter.ban)

// limited is whether 'user-1' is now rate limited
const limited = rimiter.limit('user-1')
```

---

## Events

* `limited` - ID that has just been limited
* `banned` - ID that has just been banned
* `unbanned` - ID that has just been unbanned
