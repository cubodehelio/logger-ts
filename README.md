# ts-logger

An experimental logger library for NodeJS written in TypeScript (__working progress__).

## Usage

```sh
$ npm install ts-logger
```

```js
/* methods: error/err | warn/warning | info | log | debug | silly */
const logger = require("ts-logger").logger();

logger.error("I'm an error");
logger.err("I'm also an error");

const err = new Error("oh noo!!");
logger.err(err);
logger.err("an error was fired!", err);
logger.warn("an error was fired!", err.message);

logger.log("one", 2,3, [4, 'five'], {six: 'seven', eight: [9, 10, '...']});

```

## ANSI colors support.
The library automatically detects whether colors are supported by the output environment. However you can **enable/disable** this feature by launching your programs with the following flags respectively: `--color` or `--no-color`.


## Express middleware
A basic middleware to be mounted on express which output has a specific format. For every request the middleware prints two messages one for the request (`:access_uuid <== :method :url :remoteAddr :httpVersion :userAgent`) an the other for the response (`:access_uuid ==> :status :length :elapsed`).

```js
const Logger = require('ts-logger'),
    logger = Logger.logger();

logger.silly("Init app.js");

const express = require('express'),
  app = express();

// it is important that this two express middlewares stay above of the logger one..
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logger
app.use(Logger.middleware());

// ...
```
