//================================= INCLUDE MODULES ==
var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
//================================ EXPRESS SETTINGS ==
// templating engine
app.set('view engine', 'ejs');
// Assets
app.use(express.static(__dirname + '/public'));

//================================= LOCAL VARIABLES ==


//========================================== ROUTES ==
// =============== Router for User Calls
var api = require('./routes/api');
app.use('/api', api);
// ======================= Routes for UI
// Homepage
app.get('/', function(req, res) {
  res.render('default');
});

//Create a server
var server = http.createServer(app)
	.listen(3000, function(){
		console.log('The Mini Server is listening on port 3000');
	});
