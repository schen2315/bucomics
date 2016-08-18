//profile
var express = require('express');
var router = express.Router();
var client2db = require('./../public/javascripts/client2db');
var db = require('./../public/javascripts/db');
var randomstring = require('randomstring');
var multer = require('multer');
var parseFiles = require('./../public/javascripts/parseFiles');
var parser = require('./../public/javascripts/parser');
var path = require('path');
var ncp = require('ncp').ncp;
	ncp.limit = 16;
var rimraf = require('rimraf');
var fs = require('fs');

//user profile page
router.get('/', function(req, res, next) {
	//check that a user is logged in
	//something to figure out later ...
	res.render('profile', {});
});
//authenticate user
router.post('/', function(req, res, next) {
	parser(req, '/profile', function() {
		var token = req.params.id_token;
		client2db('/profile', token, function(data) {
			if(!data.error) {
				res.send('authentication successful');
			} else {
				//error handling
			}
		});
	});
});

router.post('/upload', function(req, res, next) {
	console.log('line 37')
	// req.params is updated
	parseFiles(req, '/profile/upload/', function() {
		//first authenticate user
		console.log('line 41')
		client2db('/profile', req.params.id_token, function(auth) {
			console.log('line 43')
			if(!auth.error) {
				//call the proper db function
				db.upload(auth, req.params, function(data) {
					//change name of tempdir
					if(data) {
						ncp(req.params.tempdir, __dirname + "/../public/comics/" + req.params.url, function(err) {
							if (err) throw err;
							rimraf(req.params.tempdir, function(err) {
								if(err) throw err;
							})
							res.send("successfully saved " +
								req.params.title + "to " + req.params.url);
						});	
					} else {
						//remove the tempdir
						rimraf(req.params.tempdir, function(err) {
							if(err) throw err;
							res.send("failed to save " + req.params.title);
						});
					}
				});
			} else {
				//do something with error
				rimraf(req.params.tempdir, function(err) {
					if(err) throw err;
					res.send("failed to save " + req.params.title);
				});
			}
		});
	});
});

module.exports = router;