var express = require('express');
var app = express();
var $ = require('jquery');
var request = require('request');
var instagram = require('./middleware/instagram.js')
var mosaic = require('./middleware/mosaic.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get(/(^\/)/, instagram.getInsta, instagram.postInsta, instagram.photos, instagram.parse);
app.get('/', 
	function(req,res){ 
		res.sendFile('../client/index.html', {root: __dirname});
	}); 	

app.listen(3000);
