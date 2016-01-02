var express = require('express');
var app = express();
var $ = require('jquery');
var request = require('request');
var instagram = require('./middleware/instagram.js')


app.get(/(^\/)/, instagram.getInsta, instagram.postInsta, instagram.photos, instagram.parse);
app.get('/', 
	function(req,res){ 
		res.sendFile('../client/index.html', {root: __dirname});
	}); 	

app.listen(3000);
