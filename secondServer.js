'use strict';

var request = require('request');
var async = require('async');

var url = 'http://localhost:8585';


function getCreditLimit(clientId, fn) {
    request.get(url + '/first/creditLimit/' + clientId, function (error, response, body) {
        fn(response);
    });
};


var Percolator = require('percolator').Percolator;

var Server = function (port) {
    var server = Percolator({'port': port, 'autoLink': false});

    server.route('/second/ping',
        {
            GET: function (req, res) {
                res.object({'status': 'ok', 'service': 'second'}).send();
            }
        }
    );

    server.route('/second/decision/:id',
        {
            GET: function (req, res) {
                var clientId = req.uri.child();
                getCreditLimit(clientId, function (stuff) {
                    res.object(JSON.parse(stuff['body'])).send();
                });


            }
        });

    return server;
};

module.exports = {'Server': Server};
