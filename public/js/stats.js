$( document ).ready(function() {

    // Check for updates
    $.getJSON('http://bitcoinmini.com/nodeData/alerts.php',function(data){
        // Show update notices if updates are available
    	if(data['upgrade'][0] == 1){
            // banner
            $('#updateNotice').removeClass('hidden');
            // sidebar button
            $('#updateSidebar').removeClass('hidden');
    	} else {
            // Hide update notices
            if(data['upgrade'][0] != 1) {
                // banner
                $('#updateNotice').addClass('hidden');
                // sidebar button
                $('#updateSidebar').addClass('hidden');
            }
        }
    });

    // Declare variables
    var serveradd = 'localhost';
    var latestBlock;
    var tx24;
    var diff;
    var currentBlock;
    var peerData;
    var price;
    var genInfo;
    var blockDif;
// Get External IP
        $.getJSON('https://api.ipify.org/?format=json',function(ip){
        $('#ip').html(ip.ip);
        });
    console.log( "Bitcoin on your Mini is ready!" );

    // Main function to display data about your Mini and bitcoin network
    function updateData(){

        // Variable to your Mini's server
    	serveradd = window.location.host;



        // Get data from your Mini bitcoind
        $.getJSON('http://bitcoinmini.com/nodeData/serveradd.php',function(data){
        	var miniserver = data;
            //console.log(miniserver);

            // Get latest block
        	$.getJSON('http://'+miniserver+':3000/api/btc/getblockcount',function(data){
                //console.log(data);
        		latestBlock = data;
        	});
        });

        // Get the amount of time your Mini has been running
        $.getJSON('http://'+serveradd+'/api/uptime',function(data){
            //console.log(data);
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

        // Get number of transaction in last 24 hours - REMOVED
    	//$.getJSON('https://blockchain.info/q/24hrtransactioncount',function(data){
    	//    tx24 = data;
    	//	  $('#tx24').html(tx24.toLocaleString());
    	//});


        // Get bitcoin price from theindex.io
    	$.getJSON('http://theindex.io/api/btc/index.php',function(data){
            //console.log(data);
    		price = data;
    		$('#price').html("$"+price);
    	});

        // Get more bitcoin stats
    	$.getJSON('http://'+serveradd+'/api/getInfo',function(data){
    		//console.log(data);
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
    	$.getJSON('http://'+serveradd+'/api/restart');
    	alert('System Rebooting');
    });

    $('#shutdown').click(function(){
    	$.getJSON('http://'+serveradd+'/api/shutdown');
    	alert('System Shutting Down');
    });

    $('#updateBanner').click(function(){
    	$.getJSON('http://'+serveradd+':2000/upgrade');
    	alert('System Upgrade continuing in the background');
    });

    $('#updateButton').click(function(){
    	$.getJSON('http://'+serveradd+':2000/upgrade');
    	alert('System Upgrade continuing in the background');
    });

    // Begin function
	updateData();
    // Timer to repeat function every 60 secs
	var updateTimer = setInterval(updateData(),60000);

});
