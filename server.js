var server = require('./src/start_server');
var yargs = require('yargs').argv;

console.log("testcase option:" + yargs.testcase);

var config = {
  port: 8080,
  //storage: require('./src/storage') //yet not implemented
  storage: require('./test/testcase_storage')('testcase1'),
}

if (yargs.testcase) {
  config.storage = require('./test/testcase_storage')(yargs.testcase);
}

server.Start(config);
