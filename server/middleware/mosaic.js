var mos_token = "6dRNPXKXSPnOoAwCkQ9B6YtZbpwOCaXf"
var prevDat =  { "token": mos_token,
				"path": null,
				"resolution[]": "100",
				"tile-size": "10",
				"border-size": "2"
				}
var request = require('request')


module.exports = {
	prev: function(req, res, next){   

		var that = this;                 
		// var info = req.body
		var picArray = req.picArray;
		prevDat.path = picArray[0];
		request.post('https://www.printmosaic.com/api/v2/mosaics', {form: prevDat}, function callback(err, http, body){
			if(err){
				console.log(err)
			}
			console.log("SUCCESS", body)
			var newImgs = [];
			//parse body to get url
			var ret = JSON.parse(body)
			//remove first item from array
			picArray = picArray.slice(1)
			picArray.forEach(function(a){
				newImgs.push(a.url)
			});
			req.newImgs = newImgs;
			req.mosaicId = ret.mosaic_id;
			next();
		})
	},

	addImgs: function(req, res, next){
		var that = this;
		var str = "token="+mos_token+"&"
		req.newImgs.forEach( function(url) {
	  		str += 'images[]=' + url + '&';
		});
		//added stuff to boday
		request.patch({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'https://www.printmosaic.com/api/v2/mosaics/'+req.mosaicId,
				body: str
				},
				function callback(err, http, body){
					if(err){
						console.log(err)
					}
			console.log("SUCCESS",err, body)
			next();
		})
	},

	generate: function(req, res){
		request.post('https://www.printmosaic.com/api/v2/mosaics/'+req.mosaicId+'/generate_preview',
		 {form:{"token": mos_token}}, function callback(err, http, body){
		 	if(err){
		 		console.error(err)
		 	}
		 	console.log(body);
		 })
		//check until it's finished
		console.log("https://www.printmosaic.com/mosaics/"+req.mosaicId)

		res.redirect("https://www.printmosaic.com/mosaics/"+req.mosaicId)
	}

	
};


