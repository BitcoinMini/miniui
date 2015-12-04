var express = require('express');
var api = express.Router();
var bitcoin = require('bitcoin');
var sys = require('util')
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs-extra');
var client;
module.exports = fs.readFile('/home/miniuser/.bitcoin/bitcoin.conf','utf8', function (err, data) {
	if (err) throw err;
	// break down by lines
	var lines = data.split(/\r?\n/),x,opts = [];
	// create variable we will check later
	bitcoinconfData = '';
	// look at all lines in .conf
	for (x in lines){
		// associate each line as key value pairs
		var cur = lines[x].split("=");
	// if the key = rpcpassword
		if(cur[0] == 'rpcuser'){
		// set our value as the current value in the bitcoin.conf file
		var user = cur[1];
		}
		// if the key = rpcpassword
		if(cur[0] == 'rpcpassword'){
		// set our value as the current value in the bitcoin.conf file
		var pass = cur[1];
		}
	}

	client = new bitcoin.Client({
	  	host: 'localhost',
	  	port: 8332,
	  	user: user,
	  	pass: pass,
	  	timeout: 30000
	});
});



// middleware specific to this router
api.use(function timeLog(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log('Time: ', Date.now());
  next();
});

// define the api router
api.get('/', function(req, res) {
  res.send('TODO: API Documentation');
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
    exec("sudo systemctl stop bitcoind && sudo reboot", function (error, stdout, stderr) { res.json(stdout) });
  });
  api.get('/shutdown', function(req, res) {
    exec("sudo systemctl stop bitcoind && sudo shutdown -t now 0", function (error, stdout, stderr) { res.json(stdout) });
  });
  // For updates, pull changes and install them
  api.get('/update', function(req, res) {
    exec("sudo pacman -Syu --noconfirm && cd ~/miniui && git pull", function (error, stdout, stderr) { res.json('Update Complete' + stdout) });
  });
});

module.exports = api;
