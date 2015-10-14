//var btcData = {};
//var user = 'miniuser';//replace with node username

//var fs = require('fs'), filename = '/home/'+user+'/.bitcoin/bitcoin.conf';
//fs.readFile(filename, 'utf8', function(err, data) {
//	if (err) throw err;
//	var lines = data.split(/\r?\n/),x,opts = [];
//	for (x in lines){
//		var cur = lines[x].split("=");
//		if(cur[0] =='rpcuser'){btcData.user = cur[1];}
//		if(cur[0] == 'rpcpassword'){btcData.pass = cur[1];}
//		if(cur[0] == 'maxconnections'){btcData.maxConn = cur[1];}
//	}
//	return btcData;
//});

// Connect to bitcoind
var client = new bitcoin.Client({
  host: '192.168.1.4',
  port: 8332,
  //user: btcData['user'],
  user: 'bitcoinrpc',
  //pass: btcData['pass'],
  pass: '2U8B43mS76951G7dQUKsB5YTHnCyANEAPWsuaaJAXD6u',  //this must match the rpcpassword in ~/.bitcoin/bitcoin.conf
  timeout: 30000
});
//module.exports = client;
