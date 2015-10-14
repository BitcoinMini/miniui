var express = require('express');
var api = express.Router();
var bitcoin = require('bitcoin');
var sys = require('util')
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
eval(require('fs').readFileSync('./routes/client.js', 'utf8'));


// middleware specific to this router
api.use(function timeLog(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log('Time: ', Date.now());
  next();
});

// define the api router
api.get('/', function(req, res) {
  res.send('API calls will be here');
});

// This load basic info for the sidebar on load
api.get('/getInfo', function(req, res) {
  client.getInfo(function(err, gotInfo, resHeaders) {
    if (err) return console.log(err);
    res.send(gotInfo);
  });

  // Uptime for the Mini's core operating system
  api.get('/uptime', function(req, res) {
    exec("cat /proc/uptime", function (error, stdout, stderr) { res.json(stdout) });
  });
  // Restart and Shutdown capability
  api.get('/restart', function(req, res) {
    exec("sudo reboot", function (error, stdout, stderr) { res.json(stdout) });
  });
  api.get('/shutdown', function(req, res) {
    exec("sudo shutdown -t now 0", function (error, stdout, stderr) { res.json(stdout) });
  });
  // For updates, pull changes and install them
  api.get('/update', function(req, res) {
    exec("cd miniui && git pull", function (error, stdout, stderr) { res.json('Update Complete' + stdout) });
  });
});

module.exports = api;
