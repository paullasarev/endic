//global vars for all tests
restify = require('restify');
assert = require('assert');

testConfig = {
  port: 8080,
  storage: require('./fake_storage'),
}

client = restify.createJsonClient({
  version: '*',
  url: 'http://127.0.0.1:' + testConfig.port,
});

//start local server
var server = require('../src/start_server.js');

before(function(done) {
    testConfig.storage = require('./testcase_storage')('testcase1');
    done();
});


before(function(done) {

    server.Start(testConfig);
    done();
});
