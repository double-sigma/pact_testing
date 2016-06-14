'use strict';

// see https://github.com/pact-foundation/pact-js

var pact = require('pact');
var wrapper = require('@pact-foundation/pact-node');
var path = require('path');


describe('Services', function () {

    var mockServer = wrapper.createServer({
        port: 8585,
        log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        spec: 2
    });

    var EXPECTED_BODY = '{"status":"ok","service":"first","clientId":"2","limit":"4"}';

    beforeEach(function (done) {
        mockServer.start().then(function () {
            pact = Pact({consumer: 'second', provider: 'first'});
            done();
        })
    });

    afterEach(function (done) {
        wrapper.removeAllServers();
    });


    it('return a credit limit', function (done) {

        function requestProjects() {
            return request.get('http://localhost:8585/first/creditLimit/2').set({'Accept': 'application/json'})
        }

        // This is how you create an interaction
        pact
            .interaction()
            .given('i have a list of projects')
            .uponReceiving('a request for projects')
            .withRequest('get', '/first/creditLimit/2', null, {'Accept': 'application/json'})
            .willRespondWith(200, {'Content-Type': 'application/json'}, EXPECTED_BODY)

        // and this is how the verification process invokes your request
        // and writes the Pact file if all is well, returning you the data of the request
        // so you can do your assertions
        pact.verify(requestProjects)
            .then(function (data) {
                expect(JSON.parse(data)).to.eql(EXPECTED_BODY)
                done()
            })
            .catch(function (err) {
                done(err)
            })

    });


});
