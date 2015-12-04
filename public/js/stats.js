$( document ).ready(function() {
var latestBlock;
var currentBlock;
var bDiff;

var version = '1.5.0';
    // Check for updates
    $.getJSON('https://bitcoinmini.com/nodeData/alerts.php',function(data){
    	console.log('alerts data: '+data);
        // Show update notices if updates are available
    	//if(data['upgrade'][0] != version){
            // banner
           // $('#updateNotice').removeClass('hidden');
            // sidebar button
           // $('#updateSidebar').removeClass('hidden');
    	//} else {
            // Hide update notices
           // if(data['upgrade'][0] == version) {
                // banner
               // $('#updateNotice').addClass('hidden');
                // sidebar button
               // $('#updateSidebar').addClass('hidden');
            //}
        //}
    });



// Get External IP
        $.getJSON('https://api.ipify.org/?format=json',function(ip){
        $('#ip').html(ip.ip);
        });
	console.log( "Miniui is running" );

    // Main function to display data about your Mini and bitcoin network
function updateData(){
// Declare variables
	var serveradd = 'localhost';
	var diff;
	var peerData;
	var price;
	var genInfo;
        // Variable to your Mini's server
    	serveradd = window.location.host;

// Get latest block
	$.getJSON('https://blockchain.info/q/getblockcount',function(data){
		latestBlock = data;
	});


// Get the amount of time your Mini has been running
	$.getJSON('http://'+serveradd+'/api/uptime',function(data){
		var ut = data.split(" ");
		var mins = (ut[0]/60).toFixed(0);
		var hrs = (mins/60).toFixed(0);
		var dys = (hrs/24).toFixed(0);
		var disp = "";
		if (mins > 60){
			if (hrs > 24){
				disp = dys+" Days";
			} else {
				disp = hrs+" Hrs";
			}
		} else {
			disp = mins+" Mins";
		}
		$('#up_time').html(disp);
	});

// Get bitcoin price from theindex.io
    	$.getJSON('http://theindex.io/api/btc/index.php',function(data){
    		$('#price').html("$"+data);
    	});

// Get more bitcoin stats
    	$.getJSON('http://'+serveradd+'/api/getInfo',function(data){
    		genInfo = data;
    		$('#version').html(genInfo['protocolversion']);
    		$('#difficulty').html(parseInt(genInfo['difficulty']).toLocaleString());
    		$('#peers').html(genInfo['connections']);
    		currentBlock = genInfo['blocks'];
    		$('#block').html(currentBlock);
    		$('#system_status').html('<i class="fa fa-check-circle green"></i>Online')
    	});

// Get difference how many blocks your Mini is behind the network
    	if (currentBlock == latestBlock){
    		$('#behind').html('0 Blocks');
    	} else {
    	    blockDif = latestBlock - currentBlock;
    		$('#behind').html(blockDif+' Blocks');
    	}


    }

    // Buttons for restart, shutdown, and upgrade
    // TODO add a confirmation of user action
    $('#restart').click(function(){
    	var confirm = window.confirm('Restart Mini?');
    	if(confirm == true){
    	$.getJSON('http://'+serveradd+'/api/restart');
    	}
    });

    $('#shutdown').click(function(){
    	var confirm = window.confirm('Shutdown Mini?');
    	if(confirm == true){
    	$.getJSON('http://'+serveradd+'/api/shutdown');
    	}
    });

    $('#updateBanner').click(function(){
    	$.getJSON('http://'+serveradd+':2000/upgrade');
    	var confirm = window.confirm('Do You Want to Update Your Mini Web Interface?');
    	if(confirm == true){
    	$.getJSON('http://'+serveradd+'/api/update');
    	}
    });

    $('#updateButton').click(function(){
    	$.getJSON('http://'+serveradd+':2000/upgrade');
    	var confirm = window.confirm('Do You Want to Update Your Mini Web Interface?');
    	if(confirm == true){
    	$.getJSON('http://'+serveradd+'/api/update');
    	}
    });

    // Begin function
	updateData();


    // Timer to repeat function every 60 secs
	var updateTimer = setInterval(function(){updateData();},60000);

});
