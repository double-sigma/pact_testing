'use strict';

var Percolator = require('percolator').Percolator;

var Server = function (port) {
    var server = Percolator({'port': port, 'autoLink': false});

    server.route('/first/ping',
        {
            GET: function (req, res) {
                res.object({'status': 'ok', 'service': 'first'}).send();
            }
        }
    );

    server.route('/first/creditLimit/:id',
        {
            GET: function (req, res) {
                var keywordId = req.uri.child();
                if (keywordId <= 10) {
                    var limit = keywordId * keywordId;
                    res.object({
                        'status': 'ok',
                        'service': 'first',
                        'clientId': keywordId,
                        "limit": String(limit)
                    }).send();
                } else {
                    res.object({'status': 'ok', 'service': 'first', 'clientId': keywordId, "limit": "0"}).send();
                }

            }
        }
    );

    return server;
};

module.exports = {'Server': Server};
