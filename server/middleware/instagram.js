var request = require('request');
var mosaic = require('./mosaic.js')
var $ = require('jquery');

module.exports = {
	getInsta: function(req, res, next){
		var url = req.url;
	 	var ourCode = url.slice(url.indexOf('=')+1)
	 	if(ourCode){
	 		req.ourCode = ourCode;
	 		next();
	 	}
	},
	postInsta: function(req, res, next){
		var curlData = {client_id:'202fa7d8bf19439c9e88017884f45a2a',
						client_secret:'831bfd3e4fd14570b3027a28d1908d75',
						grant_type:'authorization_code',
						redirect_uri:'http://localhost:3000/',
		    			code: req.ourCode}	 
		request.post("https://api.instagram.com/oauth/access_token", 
			{form:curlData}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				body = JSON.parse(body);		    
			    if(body.access_token&& body.user.profile_picture){
			    	req.aT = body.access_token;
			    	req.prof = body.user.profile_picture;
			    	next();
			    }
			 }
		});
	},
	photos: function(req, res, next){
		//req.prof = profile pic

		request("https://api.instagram.com/v1/users/self/media/recent/?access_token="+req.aT, 
			function(err, res){
				var response = JSON.parse(res.body);
				req.data = response.data;
				if(req.data){
					next();
				}				
			})
	},
	parse: function(req, res, next){
		picArray = [req.prof];
		for(var i =0; i<req.data.length; i++){
			picArray.push(req.data[i].images.low_resolution);
		}
		console.log(picArray);
		req.picArray = picArray;
		next();

		// var ret = mosaic.prev(picArray);
		// res.send(mosaic.prev(picArray))
	}

}