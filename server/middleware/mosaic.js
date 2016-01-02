var mos_token = "6dRNPXKXSPnOoAwCkQ9B6YtZbpwOCaXf"
var prevDat =  { "token": mos_token,
				"path": null,
				"resolution[]": "100",
				"tile-size": "10",
				"border-size": "2"
				}
var request = require('request')


module.exports = {
	prev: function(imagesArray){       
		var that = this;                 
		// var info = req.body
		prevDat.path = imagesArray[0];
		request.post('https://www.printmosaic.com/api/v2/mosaics', {form: prevDat}, function callback(err, http, body){
			if(err){
				console.log(err)
			}
			console.log("SUCCESS", body)
			var newImgs = [];
			//parse body to get url
			var ret = JSON.parse(body)
			//remove first item from array
			imagesArray = imagesArray.slice(1)
			imagesArray.forEach(function(a){
				newImgs.push(a.url)
			});
			return that.addImgs(ret.mosaic_id, newImgs)
		})
	},

	addImgs: function(prev_url, newImgs){
		var that = this;
		var str = "token="+mos_token+"&"
		newImgs.forEach(url => {
	  		str += 'images[]=' + url + '&';
		});
		request.patch({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: 'https://www.printmosaic.com/api/v2/mosaics/'+prev_url,
				body: str
				},
				function callback(err, http, body){
					if(err){
						console.log(err)
					}
			console.log("SUCCESS",err, body)
			return that.generate(prev_url);
		})
	},

	generate: function(prev_url){
		request.post('https://www.printmosaic.com/api/v2/mosaics/'+prev_url+'/generate_preview',
		 {form:{"token": mos_token}}, function callback(err, http, body){
		 	if(err){
		 		console.error(err)
		 	}
		 	console.log(body);
		 })
		//check until it's finished
		console.log("https://www.printmosaic.com/mosaics/"+prev_url)

		return "https://www.printmosaic.com/mosaics/"+prev_url
	}

	
};


