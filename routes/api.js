var express = require('express');
var api = express.Router();
var bitcoin = require('bitcoin');
var sys = require('util')
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var btcData = {};
var user = 'miniuser';//replace with node username

var fs = require('fs'), filename = '/home/'+user+'/.bitcoin/bitcoin.conf';
fs.readFile(filename, 'utf8', function(err, data) {
	if (err) throw err;
	var lines = data.split(/\r?\n/),x,opts = [];
	for (x in lines){
		var cur = lines[x].split("=");
		if(cur[0] =='rpcuser'){btcData.user = cur[1];}
		if(cur[0] == 'rpcpassword'){btcData.pass = cur[1];}
		if(cur[0] == 'maxconnections'){btcData.maxConn = cur[1];}
	}
	return btcData;
});

var client = new bitcoin.Client({
  host: 'localhost',
  port: 8332,
  //user: btcData['user'],
  user: '123bitcoinrpc',
  //pass: btcData['pass'],
  pass: '2U8B43mS76951G7dQUKsB5YTHnCyANEAPWsuaaJAXD6u',  //this must match the rpcpassword in ~/.bitcoin/bitcoin.conf
  timeout: 30000
});

// middleware specific to this router
api.use(function timeLog(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
api.get('/', function(req, res) {
  res.send('API calls will be here');
});

// define the about route
api.get('/getInfo', function(req, res) {
 client.getInfo(function(err, gotInfo, resHeaders) {
 if (err) return console.log(err);
  res.send(gotInfo);
});

api.get('/uptime', function(req, res) {
exec("cat /proc/uptime", function (error, stdout, stderr) { res.json(stdout) });
});
api.get('/restart', function(req, res) {
exec("sudo reboot", function (error, stdout, stderr) { res.json(stdout) });
});
api.get('/shutdown', function(req, res) {
exec("sudo shutdown -t now 0", function (error, stdout, stderr) { res.json(stdout) });
});
api.get('/update', function(req, res) {
exec("cd miniui && git pull", function (error, stdout, stderr) { res.json('Update Complete' + stdout) });
});
});

module.exports = api;
