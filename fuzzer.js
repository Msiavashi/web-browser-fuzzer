var program = require('commander');
var express = require('express');
var radamsa = require('node-radamsa');
var mustache = require('mustache');
var fs = require('fs');
var path = require('path');

/* initializing the command line arguments */
program
  .version('0.0.1')
  .usage('-i [in] -o [out] -n [num]')
  .option('-p, --port [port number]', 'web server port number (default port is : 8080)', '8080')
  .option('-a, --address [ip]', 'optional server ip address (default is localhost)', '127.0.0.1')
  .option('-i, --input [dir]', 'directory of test cases (default is ./input)', './input/')
  .option('-o, --output [dir]', 'path to output folder (default is ./ouput)', './output/')
  // .option('-n, --number [integer]', 'number of outputs to be generated (default is infinity)', '-1')
  .option('-t, --template [file]', 'template to generate test cases in it (default is template.mustache)', 'template.mustache')
  .option('-r, --randomize', 'randomize selection of input test cases (default is false)')
  .parse(process.argv);

/* helper funcitons */
var getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

var getAllSamples = () => {
  return fs.readdirSync(program.input);
}

/* generate randomized data based on given test cases */
var generateTestCase = () => {
  var samples = getAllSamples();
  // var testCase = program.randomize ? path.join(program.input, samples[getRandomInt(0, samples.length)]) : path.join(program.input, samples[index]);
  var testCase = path.join(program.input, String(samples[getRandomInt(0, samples.length)]));
  return radamsa.run(testCase);
}

var makeTemplate = (testCase) => {
  var template = fs.readFileSync(program.template, 'utf8');
  mustache.parse(template);
  var objects = {
    reloadAddress: program.serverAddress,
    content: testCase
  };
  return mustache.render(template, objects);
}

/* running the server */
var app = express();
var server = app.listen(program.port, () => {
  console.log('[+] server is running on address http://%s:%s', server.address().address, server.address().port);
});

app.get('/', (req, res) => {
  console.log('[+] request received');
  var testCase = generateTestCase();
  var templatedTestCase = makeTemplate(testCase);
  res.send(templatedTestCase);
  console.log('[+] response sent');
});
