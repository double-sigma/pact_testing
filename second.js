'use strict';

var Server = require('./secondServer').Server;

var server = Server(8686);

server.listen(function () {
    console.log('Server for SECOND started on port ', server.options.port);
});

// http://localhost:8686/second/decision/id will return an id^2, but will ask for info from another service