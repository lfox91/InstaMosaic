var express = require('express');
var app = express();
var $ = require('jquery');
var request = require('request');
var instagram = require('./middleware/instagram.js')
var mosaic = require('./middleware/mosaic.js')
var path = require('path');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', 
	function(req,res){ 
		res.sendFile(path.resolve('client/index.html'));
	});
app.get(/(^\/)/, instagram.getInsta, instagram.postInsta, instagram.photos, instagram.parse, mosaic.prev, mosaic.addImgs, mosaic.generate);


app.listen(3000);
