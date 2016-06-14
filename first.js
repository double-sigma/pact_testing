'use strict';

var Server = require('./firstServer').Server;

var server = Server(8585);

server.listen(function () {
    console.log('Server for FIRST started on port ', server.options.port);
});

// eg http://localhost:8585/first/creditLimit/id will return a limit of id^2